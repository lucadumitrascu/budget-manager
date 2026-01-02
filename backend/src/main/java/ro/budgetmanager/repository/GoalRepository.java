package ro.budgetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.budgetmanager.entity.FinancialInfo;
import ro.budgetmanager.entity.Goal;

import java.util.Optional;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Integer> {
    Optional<Goal> findByNameAndFinancialInfo(String name, FinancialInfo financialInfo);
}
