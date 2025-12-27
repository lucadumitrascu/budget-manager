package ro.budgetmanager.service;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.ExpenseDto;
import ro.budgetmanager.entity.Category;
import ro.budgetmanager.entity.Expense;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.mapper.ExpenseMapper;
import ro.budgetmanager.repository.CategoryRepository;
import ro.budgetmanager.repository.ExpenseRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;
    private final CategoryRepository categoryRepository;
    private final FinancialInfoService financialInfoService;
    private final AuthService authService;

    public ExpenseService(ExpenseRepository expenseRepository,
                          ExpenseMapper expenseMapper,
                          CategoryRepository categoryRepository,
                          FinancialInfoService financialInfoService,
                          AuthService authService) {
        this.expenseRepository = expenseRepository;
        this.expenseMapper = expenseMapper;
        this.categoryRepository = categoryRepository;
        this.financialInfoService = financialInfoService;
        this.authService = authService;
    }

    public ResponseEntity<ApiResponseDto<List<ExpenseDto>>> getExpenses() {
        User user = authService.getAuthenticatedUser();
        List<Expense> expenses = expenseRepository
                .findExpensesByFinancialInfoId(user.getFinancialInfo().getId());

        return buildResponse("Expenses have been successfully retrieved.",
                expenseMapper.toExpenseDtos(expenses), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<ExpenseDto>> createExpense(ExpenseDto expenseDto) {
        User user = authService.getAuthenticatedUser();

        Optional<Category> categoryOptional = categoryRepository
                .findByNameAndFinancialInfo(expenseDto.getCategory(), user.getFinancialInfo());
        if (categoryOptional.isEmpty()) {
            return buildResponse("Category not found.", null, HttpStatus.NOT_FOUND);
        }
        Category category = categoryOptional.get();

        if (user.getFinancialInfo().getBudget().compareTo(expenseDto.getAmount()) < 0) {
            return buildResponse("Insufficient funds for this operation.", null, HttpStatus.BAD_REQUEST);
        }

        Expense expense = expenseMapper.toExpense(expenseDto, category);
        expenseRepository.save(expense);
        financialInfoService.adjustUserBudget(user, expenseDto.getAmount().negate());

        expenseDto = expenseMapper.toExpenseDto(expense);
        return buildResponse("Expense has been successfully added.", expenseDto, HttpStatus.CREATED);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> updateExpense(Integer id, ExpenseDto expenseDto) {
        User user = authService.getAuthenticatedUser();

        Optional<Expense> expenseOptional = expenseRepository.findById(id);
        if (expenseOptional.isEmpty()) {
            return buildResponse("Expense not found.", null, HttpStatus.NOT_FOUND);
        }
        Expense expense = expenseOptional.get();

        Optional<Category> categoryOptional = categoryRepository
                .findByNameAndFinancialInfo(expenseDto.getCategory(), user.getFinancialInfo());
        if (categoryOptional.isEmpty()) {
            return buildResponse("Category not found.", null, HttpStatus.NOT_FOUND);
        }
        Category category = categoryOptional.get();

        BigDecimal difference = expenseDto.getAmount().subtract(expense.getAmount());
        if (difference.compareTo(BigDecimal.ZERO) > 0 &&
                user.getFinancialInfo().getBudget().compareTo(difference) < 0) {
            return buildResponse("Insufficient funds for this operation.", null, HttpStatus.BAD_REQUEST);
        }

        applyExpenseChanges(expense, expenseDto, user, category, difference);

        return buildResponse("Expense has been successfully updated.", null, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> deleteExpense(Integer id) {
        User user = authService.getAuthenticatedUser();

        Optional<Expense> expenseOptional = expenseRepository.findById(id);
        if (expenseOptional.isEmpty()) {
            return buildResponse("Expense not found.", null, HttpStatus.NOT_FOUND);
        }
        Expense expense = expenseOptional.get();
        financialInfoService.adjustUserBudget(user, expense.getAmount());
        expenseRepository.deleteById(id);

        return buildResponse("Expense has been successfully deleted.", null, HttpStatus.OK);
    }

    private void applyExpenseChanges(Expense expense, ExpenseDto expenseDto, User user, Category category, BigDecimal difference) {
        if (difference.compareTo(BigDecimal.ZERO) != 0) {
            financialInfoService.adjustUserBudget(user, difference.negate());
            expense.setAmount(expenseDto.getAmount());
        }
        expense.setCategory(category);
        expense.setDescription(expenseDto.getDescription());
        expenseRepository.save(expense);
    }
}