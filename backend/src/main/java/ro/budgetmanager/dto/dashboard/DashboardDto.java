package ro.budgetmanager.dto.dashboard;

public class DashboardDto {

    private CardsDataDto cardsData;
    private ExpenseIncomeChartDto expenseIncomeChartData;
    private CategoryExpenseChartDto categoryExpenseChartData;
    private GoalSavingChartDto goalSavingChartData;
    private CumulativeExpenseChartDto cumulativeExpenseChartData;


    public DashboardDto(CardsDataDto cardsData,
                        ExpenseIncomeChartDto expenseIncomeChartData,
                        CategoryExpenseChartDto categoryExpenseChartData,
                        GoalSavingChartDto goalSavingChartData,
                        CumulativeExpenseChartDto cumulativeExpenseChartData) {
        this.cardsData = cardsData;
        this.expenseIncomeChartData = expenseIncomeChartData;
        this.categoryExpenseChartData = categoryExpenseChartData;
        this.goalSavingChartData = goalSavingChartData;
        this.cumulativeExpenseChartData = cumulativeExpenseChartData;
    }

    public DashboardDto() {
    }

    public CardsDataDto getCardsData() {
        return cardsData;
    }

    public void setCardsData(CardsDataDto cardsData) {
        this.cardsData = cardsData;
    }

    public ExpenseIncomeChartDto getExpenseIncomeChartData() {
        return expenseIncomeChartData;
    }

    public void setExpenseIncomeChartData(ExpenseIncomeChartDto expenseIncomeChartData) {
        this.expenseIncomeChartData = expenseIncomeChartData;
    }

    public CategoryExpenseChartDto getCategoryExpenseChartData() {
        return categoryExpenseChartData;
    }

    public void setCategoryExpenseChartData(CategoryExpenseChartDto categoryExpenseChartData) {
        this.categoryExpenseChartData = categoryExpenseChartData;
    }

    public GoalSavingChartDto getGoalSavingChartData() {
        return goalSavingChartData;
    }

    public void setGoalSavingChartData(GoalSavingChartDto goalSavingChartData) {
        this.goalSavingChartData = goalSavingChartData;
    }

    public CumulativeExpenseChartDto getCumulativeExpenseChartData() {
        return cumulativeExpenseChartData;
    }

    public void setCumulativeExpenseChartData(CumulativeExpenseChartDto cumulativeExpenseChartData) {
        this.cumulativeExpenseChartData = cumulativeExpenseChartData;
    }
}
