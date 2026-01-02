package ro.budgetmanager.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class GoalDto {

    private Integer id;

    @NotEmpty(message = "Goal name is required.")
    @Size(max = 50, message = "Goal must be at most 50 characters.")
    private String name;

    @NotNull(message = "Target amount is required.")
    @Positive(message = "Target amount cannot be negative.")
    @Digits(integer = 13, fraction = 2, message = "Target amount must be a valid number with up to 13 digits and 2 decimal places.")
    private BigDecimal targetAmount;

    private BigDecimal currentAmount;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    public GoalDto() {
    }

    public GoalDto(Integer id, String name, BigDecimal targetAmount, BigDecimal currentAmount, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.targetAmount = targetAmount;
        this.currentAmount = currentAmount;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }

    public BigDecimal getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(BigDecimal currentAmount) {
        this.currentAmount = currentAmount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
