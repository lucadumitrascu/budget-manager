package ro.budgetmanager.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public class FinancialInfoDto {
    @Digits(integer = 15, fraction = 2, message = "The budget must be a valid number with up to 15 digits and 2 decimal places.")
    private BigDecimal budget;

    @Size(min = 3, max = 3, message = "Currency should be 3 characters.")
    private String currency;

    @PositiveOrZero(message = "The salary cannot be negative.")
    @Digits(integer = 15, fraction = 2, message = "The salary must be a valid number with up to 15 digits and 2 decimal places.")
    private BigDecimal salary;

    @Min(value = 0, message = "Salary day should be between 0 and 31.")
    @Max(value = 31, message = "Salary day should be between 0 and 31.")
    private Integer salaryDay;

    public FinancialInfoDto(BigDecimal budget, String currency, BigDecimal salary, Integer salaryDay) {
        this.budget = budget;
        this.currency = currency;
        this.salary = salary;
        this.salaryDay = salaryDay;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public Integer getSalaryDay() {
        return salaryDay;
    }

    public void setSalaryDay(Integer salaryDay) {
        this.salaryDay = salaryDay;
    }
}
