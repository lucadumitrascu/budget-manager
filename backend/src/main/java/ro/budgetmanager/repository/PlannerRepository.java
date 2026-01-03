package ro.budgetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.budgetmanager.entity.Planner;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PlannerRepository extends JpaRepository<Planner, Integer> {
    @Query("""
              SELECT p FROM Planner p
              LEFT JOIN FETCH p.fixedTransactions
              WHERE p.financialInfo.user.lastAccessTime > :dateTime
            """)
    List<Planner> findAllWithFixedTransactionsAndLastAccessTimeAfter(@Param("dateTime") LocalDateTime dateTime);
}
