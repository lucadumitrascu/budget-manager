package ro.budgetmanager.dto;

import jakarta.validation.constraints.*;
import ro.expensestracker.enums.FixedTransactionFrequency;
import ro.expensestracker.enums.FixedTransactionType;

import java.math.BigDecimal;

public class FixedTransactionDto {

    private Integer id;

    @NotEmpty(message = "Title is required.")
    @Size(max = 30, message = "Title must be at most 30 characters.")
    private String title;

    @NotNull(message = "Type is required (Expense/Income).")
    private FixedTransactionType type;

    @NotNull(message = "Amount is required.")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0.")
    @Digits(integer = 13, fraction = 2, message = "Amount must be a valid number with up to 13 digits and 2 decimal places.")
    private BigDecimal amount;

    @NotNull(message = "Frequency is required (Daily/Weekly/Monthly).")
    private FixedTransactionFrequency frequency;

    @NotNull(message = "Execution day is required.")
    @Min(value = 0, message = "Execution day should be between 0 and 31.")
    @Max(value = 31, message = "Execution day should be between 0 and 31.")
    private Integer executionDay;

    @NotNull(message = "Category/Source is required.")
    private Integer destinationId;

    public FixedTransactionDto(Integer id, String title, FixedTransactionType type, BigDecimal amount,
                               FixedTransactionFrequency frequency, Integer executionDay,
                               Integer destinationId) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.amount = amount;
        this.frequency = frequency;
        this.executionDay = executionDay;
        this.destinationId = destinationId;
    }

    public FixedTransactionDto() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public FixedTransactionType getType() {
        return type;
    }

    public void setType(FixedTransactionType type) {
        this.type = type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(Integer destinationId) {
        this.destinationId = destinationId;
    }

    public FixedTransactionFrequency getFrequency() {
        return frequency;
    }

    public void setFrequency(FixedTransactionFrequency frequency) {
        this.frequency = frequency;
    }

    public Integer getExecutionDay() {
        return executionDay;
    }

    public void setExecutionDay(Integer executionDay) {
        this.executionDay = executionDay;
    }
}
