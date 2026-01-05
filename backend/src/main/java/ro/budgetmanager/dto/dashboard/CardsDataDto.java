package ro.budgetmanager.dto.dashboard;

import java.math.BigDecimal;

public class CardsDataDto {
    private BigDecimal totalExpenses;
    private BigDecimal totalIncomes;
    private String expenseIncomeRatio;


    public CardsDataDto(BigDecimal totalExpenses, BigDecimal totalIncomes, String expenseIncomeRatio) {
        this.totalExpenses = totalExpenses;
        this.totalIncomes = totalIncomes;
        this.expenseIncomeRatio = expenseIncomeRatio;
    }

    public CardsDataDto() {
    }

    public BigDecimal getTotalExpenses() {
        return totalExpenses;
    }

    public BigDecimal getTotalIncomes() {
        return totalIncomes;
    }

    public String getExpenseIncomeRatio() {
        return expenseIncomeRatio;
    }
}
