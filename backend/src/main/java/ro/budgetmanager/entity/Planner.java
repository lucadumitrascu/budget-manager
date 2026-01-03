package ro.budgetmanager.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
public class Planner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private BigDecimal monthlyBudget;

    @OneToOne
    @JoinColumn(name = "selected_goal_id")
    private Goal selectedGoal;

    @OneToMany(mappedBy = "planner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FixedTransaction> fixedTransactions;

    @OneToOne
    @JoinColumn(name = "financial_info_id", nullable = false)
    private FinancialInfo financialInfo;

    @PrePersist
    public void prePersist() {
        if (this.monthlyBudget == null) {
            this.monthlyBudget = BigDecimal.ZERO;
        }
    }

    public Planner(Integer id, BigDecimal monthlyBudget, Goal selectedGoal,
                   FinancialInfo financialInfo, List<FixedTransaction> fixedTransactions) {
        this.id = id;
        this.monthlyBudget = monthlyBudget;
        this.selectedGoal = selectedGoal;
        this.financialInfo = financialInfo;
        this.fixedTransactions = fixedTransactions;
    }

    public Planner() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getMonthlyBudget() {
        return monthlyBudget;
    }

    public void setMonthlyBudget(BigDecimal monthlyBudget) {
        this.monthlyBudget = monthlyBudget;
    }

    public Goal getSelectedGoal() {
        return selectedGoal;
    }

    public void setSelectedGoal(Goal selectedGoal) {
        this.selectedGoal = selectedGoal;
    }

    public List<FixedTransaction> getFixedTransactions() {
        return fixedTransactions;
    }

    public void setFixedTransactions(List<FixedTransaction> fixedTransactions) {
        this.fixedTransactions = fixedTransactions;
    }

    public FinancialInfo getFinancialInfo() {
        return financialInfo;
    }

    public void setFinancialInfo(FinancialInfo financialInfo) {
        this.financialInfo = financialInfo;
    }
}
