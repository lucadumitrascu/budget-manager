package ro.budgetmanager.dto;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.util.List;

public class PlannerDto {

    @NotNull(message = "Monthly budget is required.")
    @PositiveOrZero(message = "Monthly budget cannot be negative.")
    @Digits(integer = 13, fraction = 2, message = "Monthly budget must be a valid number with up to 13 digits and 2 decimal places.")
    private BigDecimal monthlyBudget;

    private List<CategoryDto> categories;

    private Integer selectedGoalId;

    public PlannerDto(BigDecimal monthlyBudget, List<CategoryDto> categories, Integer selectedGoalId) {
        this.monthlyBudget = monthlyBudget;
        this.categories = categories;
        this.selectedGoalId = selectedGoalId;
    }

    public PlannerDto() {
    }

    public BigDecimal getMonthlyBudget() {
        return monthlyBudget;
    }

    public void setMonthlyBudget(BigDecimal monthlyBudget) {
        this.monthlyBudget = monthlyBudget;
    }

    public List<CategoryDto> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryDto> categories) {
        this.categories = categories;
    }

    public Integer getSelectedGoalId() {
        return selectedGoalId;
    }

    public void setSelectedGoalId(Integer selectedGoalId) {
        this.selectedGoalId = selectedGoalId;
    }
}
