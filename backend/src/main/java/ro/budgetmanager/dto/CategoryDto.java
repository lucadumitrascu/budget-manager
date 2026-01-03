package ro.budgetmanager.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CategoryDto {

    private Integer id;

    @NotEmpty(message = "Category name is required.")
    @Size(max = 50, message = "Category must be at most 50 characters.")
    private String name;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    private BigDecimal monthlyLimit;

    public CategoryDto(Integer id, String name, LocalDateTime createdAt, BigDecimal monthlyLimit) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.monthlyLimit = monthlyLimit;
    }

    public CategoryDto() {
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public BigDecimal getMonthlyLimit() {
        return monthlyLimit;
    }

    public void setMonthlyLimit(BigDecimal monthlyLimit) {
        this.monthlyLimit = monthlyLimit;
    }
}
