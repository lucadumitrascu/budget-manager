package ro.budgetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.budgetmanager.entity.FinancialInfo;
import ro.budgetmanager.entity.Income;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Integer> {
    List<Income> findByIncomeSource_FinancialInfoAndCreatedAtBetween(FinancialInfo financialInfo, LocalDateTime startDate, LocalDateTime endDate);
}