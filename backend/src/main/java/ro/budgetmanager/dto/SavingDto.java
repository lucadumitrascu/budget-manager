package ro.budgetmanager.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SavingDto {

    private Integer id;

    @NotEmpty(message = "Goal is required.")
    @Size(max = 50, message = "Goal must be at most 50 characters.")
    private String goal;

    @NotNull(message = "Amount is required.")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0.")
    @Digits(integer = 13, fraction = 2, message = "Amount must be a valid number with up to 13 digits and 2 decimal places.")
    private BigDecimal amount;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    public SavingDto() {
    }

    public SavingDto(Integer id, String goal, BigDecimal amount, LocalDateTime createdAt) {
        this.id = id;
        this.goal = goal;
        this.amount = amount;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
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
