package ro.budgetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.budgetmanager.entity.FixedTransaction;
import ro.budgetmanager.entity.Planner;

import java.util.List;

@Repository
public interface FixedTransactionRepository extends JpaRepository<FixedTransaction, Integer> {
    List<FixedTransaction> findByPlanner(Planner planner);
}
