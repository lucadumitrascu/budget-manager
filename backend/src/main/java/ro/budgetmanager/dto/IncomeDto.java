package ro.budgetmanager.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class IncomeDto {

    private Integer id;

    @NotEmpty(message = "Source is required.")
    @Size(max = 50, message = "Source must be at most 50 characters.")
    private String incomeSource;

    @NotNull(message = "Amount is required.")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0.")
    @Digits(integer = 13, fraction = 2, message = "The amount must be a valid number with up to 13 digits and 2 decimal places.")
    private BigDecimal amount;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    public IncomeDto(Integer id, String incomeSource, BigDecimal amount, LocalDateTime createdAt) {
        this.id = id;
        this.incomeSource = incomeSource;
        this.amount = amount;
        this.createdAt = createdAt;
    }

    public IncomeDto() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIncomeSource() {
        return incomeSource;
    }

    public void setIncomeSource(String incomeSource) {
        this.incomeSource = incomeSource;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
