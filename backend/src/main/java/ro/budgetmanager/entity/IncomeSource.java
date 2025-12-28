package ro.budgetmanager.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "income_source")
public class IncomeSource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "incomeSource", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Income> incomes;

    @ManyToOne
    @JoinColumn(name = "financial_info_id", nullable = false)
    private FinancialInfo financialInfo;

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    public IncomeSource(Integer id, String name, LocalDateTime createdAt, List<Income> incomes, FinancialInfo financialInfo) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.incomes = incomes;
        this.financialInfo = financialInfo;
    }

    public IncomeSource() {
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

    public List<Income> getIncomes() {
        return incomes;
    }

    public void setIncomes(List<Income> incomes) {
        this.incomes = incomes;
    }

    public FinancialInfo getFinancialInfo() {
        return financialInfo;
    }

    public void setFinancialInfo(FinancialInfo financialInfo) {
        this.financialInfo = financialInfo;
    }
}
