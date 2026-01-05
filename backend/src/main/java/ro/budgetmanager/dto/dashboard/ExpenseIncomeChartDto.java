package ro.budgetmanager.dto.dashboard;

import java.math.BigDecimal;
import java.util.List;

public class ExpenseIncomeChartDto {

    private List<String> monthLabels;
    private List<BigDecimal> incomeValues;
    private List<BigDecimal> expenseValues;

    public ExpenseIncomeChartDto(List<String> monthLabels, List<BigDecimal> incomeValues, List<BigDecimal> expenseValues) {
        this.monthLabels = monthLabels;
        this.incomeValues = incomeValues;
        this.expenseValues = expenseValues;
    }

    public ExpenseIncomeChartDto() {
    }

    public List<String> getMonthLabels() {
        return monthLabels;
    }

    public void setMonthLabels(List<String> monthLabels) {
        this.monthLabels = monthLabels;
    }

    public List<BigDecimal> getIncomeValues() {
        return incomeValues;
    }

    public void setIncomeValues(List<BigDecimal> incomeValues) {
        this.incomeValues = incomeValues;
    }

    public List<BigDecimal> getExpenseValues() {
        return expenseValues;
    }

    public void setExpenseValues(List<BigDecimal> expenseValues) {
        this.expenseValues = expenseValues;
    }
}
