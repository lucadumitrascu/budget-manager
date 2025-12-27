package ro.budgetmanager.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ExpenseDto {

    private Integer id;

    @NotEmpty(message = "Category is required.")
    @Size(max = 50, message = "Category must be at most 50 characters.")
    private String category;

    @NotNull(message = "Amount is required.")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0.")
    @Digits(integer = 13, fraction = 2, message = "Amount must be a valid number with up to 13 digits and 2 decimal places.")
    private BigDecimal amount;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Size(max = 100, message = "Description must be at most 100 characters.")
    private String description;

    public ExpenseDto(Integer id, String category, BigDecimal amount, LocalDateTime createdAt, String description) {
        this.id = id;
        this.category = category;
        this.amount = amount;
        this.createdAt = createdAt;
        this.description = description;
    }

    public ExpenseDto() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
