package ro.budgetmanager.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "financial_info")
public class FinancialInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private BigDecimal budget;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private BigDecimal salary;

    @Column(nullable = false, columnDefinition = "TINYINT UNSIGNED")
    private Integer salaryDay;

    @OneToMany(mappedBy = "financialInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Category> categories;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public FinancialInfo(BigDecimal budget, String currency, BigDecimal salary,
                         Integer salaryDay, List<Category> categories, User user) {
        this.budget = budget;
        this.currency = currency;
        this.salary = salary;
        this.salaryDay = salaryDay;
        this.categories = categories;
        this.user = user;
    }

    public FinancialInfo() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
