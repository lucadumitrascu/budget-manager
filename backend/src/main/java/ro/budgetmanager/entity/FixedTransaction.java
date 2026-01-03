package ro.budgetmanager.entity;

import jakarta.persistence.*;
import ro.expensestracker.enums.FixedTransactionFrequency;
import ro.expensestracker.enums.FixedTransactionType;

import java.math.BigDecimal;

@Entity
@Table(name = "fixed_transaction")
public class FixedTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FixedTransactionType type;

    @Column(nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FixedTransactionFrequency frequency;

    @Column(nullable = false)
    private Integer executionDay;

    @Column(nullable = false)
    private Integer destinationId;

    @ManyToOne
    @JoinColumn(name = "planner_id", nullable = false)
    private Planner planner;

    public FixedTransaction(Integer id, String title, FixedTransactionType type, BigDecimal amount,
                            FixedTransactionFrequency frequency, Integer executionDay,
                            Integer destinationId, Planner planner) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.amount = amount;
        this.frequency = frequency;
        this.executionDay = executionDay;
        this.destinationId = destinationId;
        this.planner = planner;
    }

    public FixedTransaction() {
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

    public Integer getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(Integer destinationId) {
        this.destinationId = destinationId;
    }

    public Planner getPlanner() {
        return planner;
    }

    public void setPlanner(Planner planner) {
        this.planner = planner;
    }
}
