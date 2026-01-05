package ro.budgetmanager.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.dashboard.*;
import ro.budgetmanager.entity.*;
import ro.budgetmanager.enums.FixedTransactionType;
import ro.budgetmanager.repository.ExpenseRepository;
import ro.budgetmanager.repository.IncomeRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;

import static ro.budgetmanager.util.ApiUtils.buildResponse;
import static ro.budgetmanager.util.DateUtils.getDateIntervalFromPeriod;

@Service
public class DashboardService {

    private final AuthService authService;
    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;

    public DashboardService(AuthService authService,
                            ExpenseRepository expenseRepository,
                            IncomeRepository incomeRepository) {
        this.authService = authService;
        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
    }

    public ResponseEntity<ApiResponseDto<DashboardDto>> getDashboardData(String period) {
        User user = authService.getAuthenticatedUser();
        LocalDateTime[] dateInterval = getDateIntervalFromPeriod(period);
        LocalDateTime startDate = dateInterval[0];
        LocalDateTime endDate = dateInterval[1];

        DashboardDto dashboardDto = buildDashboardData(user.getFinancialInfo(), startDate, endDate);
        return buildResponse("Dashboard data have been successfully retrieved.", dashboardDto, HttpStatus.OK);
    }

    public DashboardDto buildDashboardData(FinancialInfo financialInfo, LocalDateTime startDate, LocalDateTime endDate) {
        List<Expense> expensesInPeriod = expenseRepository
                .findByCategory_FinancialInfoAndCreatedAtBetween(financialInfo, startDate, endDate);
        List<Income> incomesInPeriod = incomeRepository
                .findByIncomeSource_FinancialInfoAndCreatedAtBetween(financialInfo, startDate, endDate);

        YearMonth currentMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59, 59);

        List<Expense> currentMonthExpenses = expenseRepository
                .findByCategory_FinancialInfoAndCreatedAtBetween(financialInfo, startOfMonth, endOfMonth);

        LocalDateTime twelveMonthsAgo = LocalDate.now().minusMonths(11)
                .withDayOfMonth(1).atStartOfDay();
        List<Expense> last12MonthsExpenses = expenseRepository
                .findByCategory_FinancialInfoAndCreatedAtAfter(financialInfo, twelveMonthsAgo);
        List<Income> last12MonthsIncomes = incomeRepository
                .findByIncomeSource_FinancialInfoAndCreatedAtAfter(financialInfo, twelveMonthsAgo);

        return new DashboardDto(
                buildCardsData(expensesInPeriod, incomesInPeriod),
                buildMonthlyIncomeExpenseChartData(last12MonthsExpenses, last12MonthsIncomes),
                buildCategoryExpenseChartData(expensesInPeriod),
                buildGoalSavingChartData(financialInfo.getGoals()),
                buildCumulativeExpenseChartData(currentMonthExpenses, financialInfo)
        );
    }

    private CardsDataDto buildCardsData(List<Expense> expenses, List<Income> incomes) {
        BigDecimal totalExpenses = BigDecimal.ZERO;
        for (Expense expense : expenses) {
            totalExpenses = totalExpenses.add(expense.getAmount());
        }

        BigDecimal totalIncomes = BigDecimal.ZERO;
        for (Income income : incomes) {
            totalIncomes = totalIncomes.add(income.getAmount());
        }

        String ratio = calculateExpenseIncomeRatio(totalExpenses, totalIncomes);
        return new CardsDataDto(totalExpenses, totalIncomes, ratio);
    }

    private String calculateExpenseIncomeRatio(BigDecimal expenses, BigDecimal incomes) {
        if (incomes.compareTo(BigDecimal.ZERO) == 0) return "No data";
        BigDecimal ratio = expenses.divide(incomes, 2, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .setScale(1, RoundingMode.HALF_UP);
        return ratio.toString();
    }

    private CategoryExpenseChartDto buildCategoryExpenseChartData(List<Expense> expenses) {
        Map<String, BigDecimal> totalsByCategory = calculateTotalsByCategory(expenses);
        List<String> sortedCategories = new ArrayList<>(totalsByCategory.keySet());
        sortedCategories.sort((a, b) -> totalsByCategory.get(b).compareTo(totalsByCategory.get(a)));

        List<String> categoryLabels = new ArrayList<>();
        List<BigDecimal> categoryAmounts = new ArrayList<>();
        List<BigDecimal> othersAmounts = new ArrayList<>();

        for (int i = 0; i < sortedCategories.size(); i++) {
            String name = sortedCategories.get(i);
            BigDecimal amount = totalsByCategory.get(name);
            if (i < 9) {
                categoryLabels.add(name);
                categoryAmounts.add(amount);
            } else {
                othersAmounts.add(amount);
            }
        }

        if (!othersAmounts.isEmpty()) {
            BigDecimal othersTotal = BigDecimal.ZERO;
            for (BigDecimal amount : othersAmounts) {
                othersTotal = othersTotal.add(amount);
            }
            categoryLabels.add("Others");
            categoryAmounts.add(othersTotal);
        }

        return new CategoryExpenseChartDto(categoryLabels, categoryAmounts);
    }

    private Map<String, BigDecimal> calculateTotalsByCategory(List<Expense> expenses) {
        Map<String, BigDecimal> totals = new HashMap<>();
        for (Expense e : expenses) {
            String category = e.getCategory().getName();
            totals.put(category, totals.getOrDefault(category, BigDecimal.ZERO).add(e.getAmount()));
        }
        return totals;
    }

    private CumulativeExpenseChartDto buildCumulativeExpenseChartData(List<Expense> currentMonthExpenses, FinancialInfo financialInfo) {
        Planner planner = financialInfo.getPlanner();
        BigDecimal budget = financialInfo.getBudget();

        LocalDate today = LocalDate.now();
        YearMonth currentMonth = YearMonth.from(today);
        int daysInMonth = currentMonth.lengthOfMonth();

        BigDecimal[] dailySums = new BigDecimal[daysInMonth];
        Arrays.fill(dailySums, BigDecimal.ZERO);
        BigDecimal totalLine = getTotalLine(planner, budget);

        for (Expense e : currentMonthExpenses) {
            int day = e.getCreatedAt().getDayOfMonth();
            dailySums[day - 1] = dailySums[day - 1].add(e.getAmount());
        }

        List<BigDecimal> cumulativeAmounts = new ArrayList<>();
        BigDecimal cumulative = BigDecimal.ZERO;
        for (BigDecimal daily : dailySums) {
            cumulative = cumulative.add(daily);
            cumulativeAmounts.add(cumulative);
        }

        List<String> dayLabels = new ArrayList<>();
        List<BigDecimal> filteredCumulative = new ArrayList<>();

        for (int i = 0; i < daysInMonth; i++) {
            if (i == 0 || (i + 1) % 5 == 0) {
                dayLabels.add(String.valueOf(i + 1));
                filteredCumulative.add(cumulativeAmounts.get(i));
            }
        }

        return new CumulativeExpenseChartDto(dayLabels, filteredCumulative, totalLine);
    }

    private BigDecimal getTotalLine(Planner planner, BigDecimal budget) {
        BigDecimal totalLine;
        if (planner.getMonthlyBudget().compareTo(BigDecimal.ZERO) > 0) {
            totalLine = planner.getMonthlyBudget();
        } else {
            totalLine = budget;
            if (totalLine.compareTo(BigDecimal.ZERO) == 0) {
                for (FixedTransaction ft : planner.getFixedTransactions()) {
                    if (ft.getType() == FixedTransactionType.INCOME) {
                        totalLine = totalLine.add(ft.getAmount());
                    }
                }
            }
        }
        return totalLine;
    }

    private GoalSavingChartDto buildGoalSavingChartData(List<Goal> goals) {
        sortGoalsByPercentageSaved(goals);

        List<String> goalLabels = new ArrayList<>();
        List<BigDecimal> savedPercentages = new ArrayList<>();
        List<BigDecimal> othersSavedPercentages = new ArrayList<>();

        for (int i = 0; i < goals.size(); i++) {
            Goal goal = goals.get(i);
            BigDecimal percent = goal.getCurrentAmount()
                    .multiply(BigDecimal.valueOf(100))
                    .divide(goal.getTargetAmount(), 2, RoundingMode.HALF_UP)
                    .min(BigDecimal.valueOf(100));
            if (i < 4) {
                goalLabels.add(goal.getName());
                savedPercentages.add(percent);
            } else {
                othersSavedPercentages.add(percent);
            }
        }

        if (!othersSavedPercentages.isEmpty()) {
            BigDecimal othersTotal = BigDecimal.ZERO;
            for (BigDecimal percentage : othersSavedPercentages) {
                othersTotal = othersTotal.add(percentage);
            }
            BigDecimal othersAverage = othersTotal.divide(BigDecimal.valueOf(othersSavedPercentages.size()), 2, RoundingMode.HALF_UP);
            goalLabels.add("Others");
            savedPercentages.add(othersAverage);
        }

        return new GoalSavingChartDto(goalLabels, savedPercentages);
    }

    private void sortGoalsByPercentageSaved(List<Goal> goals) {
        goals.sort((a, b) -> {
            BigDecimal percentA = a.getCurrentAmount().multiply(BigDecimal.valueOf(100))
                    .divide(a.getTargetAmount(), 2, RoundingMode.HALF_UP);
            BigDecimal percentB = b.getCurrentAmount().multiply(BigDecimal.valueOf(100))
                    .divide(b.getTargetAmount(), 2, RoundingMode.HALF_UP);
            return percentB.compareTo(percentA);
        });
    }

    private ExpenseIncomeChartDto buildMonthlyIncomeExpenseChartData(List<Expense> expenses, List<Income> incomes) {
        Map<YearMonth, BigDecimal> expenseMap = aggregateExpenseMonthlyAmounts(expenses);
        Map<YearMonth, BigDecimal> incomeMap = aggregateIncomeMonthlyAmounts(incomes);
        Set<YearMonth> allMonthsWithData = new HashSet<>();
        allMonthsWithData.addAll(expenseMap.keySet());
        allMonthsWithData.addAll(incomeMap.keySet());

        List<YearMonth> sortedMonths = new ArrayList<>(allMonthsWithData);
        sortedMonths.sort(Comparator.naturalOrder());

        while (sortedMonths.size() < 3) {
            YearMonth first = sortedMonths.isEmpty() ?
                    YearMonth.now() : sortedMonths.getFirst().minusMonths(1);
            sortedMonths.addFirst(first);
        }

        List<String> monthLabels = new ArrayList<>();
        List<BigDecimal> incomeValues = new ArrayList<>();
        List<BigDecimal> expenseValues = new ArrayList<>();

        for (YearMonth month : sortedMonths) {
            String monthLabel = month.getMonth().name().substring(0, 3) + " " + month.getYear();
            monthLabels.add(monthLabel);
            incomeValues.add(incomeMap.getOrDefault(month, BigDecimal.ZERO));
            expenseValues.add(expenseMap.getOrDefault(month, BigDecimal.ZERO));
        }

        return new ExpenseIncomeChartDto(monthLabels, incomeValues, expenseValues);
    }

    private Map<YearMonth, BigDecimal> aggregateExpenseMonthlyAmounts(List<Expense> expenses) {
        Map<YearMonth, BigDecimal> expenseMap = new HashMap<>();
        for (Expense expense : expenses) {
            YearMonth monthKey = YearMonth.from(expense.getCreatedAt().toLocalDate());
            expenseMap.put(monthKey, expenseMap.getOrDefault(monthKey, BigDecimal.ZERO).add(expense.getAmount()));
        }
        return expenseMap;
    }

    private Map<YearMonth, BigDecimal> aggregateIncomeMonthlyAmounts(List<Income> incomes) {
        Map<YearMonth, BigDecimal> incomeMap = new HashMap<>();
        for (Income income : incomes) {
            YearMonth monthKey = YearMonth.from(income.getCreatedAt().toLocalDate());
            incomeMap.put(monthKey, incomeMap.getOrDefault(monthKey, BigDecimal.ZERO).add(income.getAmount()));
        }
        return incomeMap;
    }
}
