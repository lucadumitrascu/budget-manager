package ro.budgetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.budgetmanager.entity.FinancialInfo;
import ro.budgetmanager.entity.IncomeSource;

import java.util.Optional;

@Repository
public interface IncomeSourceRepository extends JpaRepository<IncomeSource, Integer> {
    Optional<IncomeSource> findByNameAndFinancialInfo(String name, FinancialInfo financialInfo);
}
