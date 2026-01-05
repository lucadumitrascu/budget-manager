package ro.budgetmanager.service;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.CategoryDto;
import ro.budgetmanager.dto.PlannerDto;
import ro.budgetmanager.entity.*;
import ro.budgetmanager.enums.FixedTransactionType;
import ro.budgetmanager.mapper.PlannerMapper;
import ro.budgetmanager.repository.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class PlannerService {

    private final PlannerRepository plannerRepository;
    private final PlannerMapper plannerMapper;
    private final FixedTransactionRepository fixedTransactionRepository;
    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final IncomeSourceRepository incomeSourceRepository;
    private final SavingService savingService;
    private final SavingRepository savingRepository;
    private final GoalRepository goalRepository;
    private final FinancialInfoService financialInfoService;
    private final AuthService authService;

    public PlannerService(PlannerRepository plannerRepository,
                          PlannerMapper plannerMapper,
                          FixedTransactionRepository fixedTransactionRepository,
                          ExpenseRepository expenseRepository,
                          CategoryRepository categoryRepository,
                          IncomeRepository incomeRepository,
                          IncomeSourceRepository incomeSourceRepository,
                          SavingService savingService,
                          SavingRepository savingRepository,
                          GoalRepository goalRepository,
                          FinancialInfoService financialInfoService,
                          AuthService authService) {
        this.plannerRepository = plannerRepository;
        this.plannerMapper = plannerMapper;
        this.fixedTransactionRepository = fixedTransactionRepository;
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
        this.incomeRepository = incomeRepository;
        this.incomeSourceRepository = incomeSourceRepository;
        this.savingService = savingService;
        this.savingRepository = savingRepository;
        this.goalRepository = goalRepository;
        this.financialInfoService = financialInfoService;
        this.authService = authService;
    }

    public ResponseEntity<ApiResponseDto<PlannerDto>> getPlanner() {
        User user = authService.getAuthenticatedUser();

        return buildResponse("Planner data have been successfully retrieved.",
                plannerMapper.toPlannerDto(user.getFinancialInfo().getPlanner()), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> updatePlannerSettings(PlannerDto plannerDto) {
        User user = authService.getAuthenticatedUser();
        Planner planner = user.getFinancialInfo().getPlanner();

        planner.setMonthlyBudget(plannerDto.getMonthlyBudget());
        if (plannerDto.getSelectedGoalId() != null) {
            Optional<Goal> goalOptional = goalRepository.findById(plannerDto.getSelectedGoalId());
            if (goalOptional.isPresent()) {
                Goal goal = goalOptional.get();
                planner.setSelectedGoal(goal);
            }
        }
        plannerRepository.save(planner);
        updateCategoryLimits(plannerDto);
        return buildResponse("Planner settings have been successfully updated.", null, HttpStatus.OK);
    }

    private void updateCategoryLimits(PlannerDto plannerDto) {
        if (plannerDto.getCategories() == null) return;
        for (CategoryDto categoryDto : plannerDto.getCategories()) {
            Optional<Category> categoryOptional = categoryRepository.findById(categoryDto.getId());
            if (categoryOptional.isPresent()) {
                Category category = categoryOptional.get();
                category.setMonthlyLimit(categoryDto.getMonthlyLimit());
                categoryRepository.save(category);
            }
        }
    }

    @Transactional
    public void allocateSurplusForUser(User user) {
        Planner planner = user.getFinancialInfo().getPlanner();
        Goal goal = planner.getSelectedGoal();
        if (goal == null) return;
        List<Category> categories = categoryRepository.findAllByFinancialInfo(user.getFinancialInfo());
        if (categories == null || categories.isEmpty()) return;

        BigDecimal surplus = calculateSurplus(planner, categories);
        if (surplus.compareTo(BigDecimal.ZERO) > 0) {
            Saving saving = new Saving();
            saving.setGoal(goal);
            saving.setAmount(surplus);
            savingRepository.save(saving);
            savingService.adjustBudgetAndGoal(user, saving, goal);
        }
    }

    private BigDecimal calculateSurplus(Planner planner, List<Category> categories) {
        BigDecimal totalAllocated = categories.stream()
                .map(Category::getMonthlyLimit)
                .filter(limit -> limit != null && limit.compareTo(BigDecimal.ZERO) > 0)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return planner.getMonthlyBudget().subtract(totalAllocated);
    }

    @Transactional
    public void processFixedTransactionsForUser(Planner planner) {
        List<FixedTransaction> transactions = planner.getFixedTransactions();
        if (transactions == null || transactions.isEmpty()) return;
        User user = planner.getFinancialInfo().getUser();

        int dayOfMonth = LocalDate.now().getDayOfMonth();
        int dayOfWeek = LocalDate.now().getDayOfWeek().getValue();
        for (FixedTransaction transaction : transactions) {
            if (shouldExecuteTransaction(transaction, dayOfMonth, dayOfWeek)) {
                if (transaction.getType() == FixedTransactionType.INCOME) {
                    processIncomeTransaction(transaction, user);
                } else {
                    processExpenseTransaction(transaction, user);
                }
            }
        }
    }

    private boolean shouldExecuteTransaction(FixedTransaction transaction, int dayOfMonth, int dayOfWeek) {
        return switch (transaction.getFrequency()) {
            case DAILY -> true;
            case WEEKLY -> transaction.getExecutionDay() == dayOfWeek;
            case MONTHLY -> transaction.getExecutionDay() == dayOfMonth;
        };
    }

    private void processIncomeTransaction(FixedTransaction transaction, User user) {
        IncomeSource incomeSource;

        Optional<IncomeSource> incomeSourceOptional = incomeSourceRepository.findById(transaction.getDestinationId());
        if (incomeSourceOptional.isEmpty()) {
            IncomeSource newIncomeSource = new IncomeSource();
            newIncomeSource.setName("Planned Incomes");
            newIncomeSource.setFinancialInfo(user.getFinancialInfo());
            incomeSource = incomeSourceRepository.save(newIncomeSource);

            transaction.setDestinationId(incomeSource.getId());
            fixedTransactionRepository.save(transaction);
        } else {
            incomeSource = incomeSourceOptional.get();
        }

        Income income = new Income();
        income.setAmount(transaction.getAmount());
        income.setIncomeSource(incomeSource);
        incomeRepository.save(income);
        financialInfoService.adjustUserBudget(user, income.getAmount());
    }

    private void processExpenseTransaction(FixedTransaction transaction, User user) {
        Category category;

        Optional<Category> categoryOptional = categoryRepository.findById(transaction.getDestinationId());
        if (categoryOptional.isEmpty()) {
            Category newCategory = new Category();
            newCategory.setName("Planned Expenses");
            newCategory.setFinancialInfo(user.getFinancialInfo());
            category = categoryRepository.save(newCategory);

            transaction.setDestinationId(category.getId());
            fixedTransactionRepository.save(transaction);
        } else {
            category = categoryOptional.get();
        }

        Expense expense = new Expense();
        expense.setAmount(transaction.getAmount());
        expense.setDescription("Planned Expense");
        expense.setCategory(category);
        expenseRepository.save(expense);

        financialInfoService.adjustUserBudget(user, expense.getAmount().negate());
    }
}