package ro.budgetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.budgetmanager.entity.FinancialInfo;

public interface FinancialInfoRepository extends JpaRepository<FinancialInfo, Integer> {
}
