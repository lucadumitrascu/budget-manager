package ro.budgetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.budgetmanager.entity.Expense;
import ro.budgetmanager.entity.FinancialInfo;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findByCategory_FinancialInfo_Id(Integer financialInfoId);

    @Query("""
                SELECT SUM(e.amount)
                FROM Expense e
                WHERE e.category.id = :categoryId
                  AND e.category.financialInfo = :financialInfo
                  AND e.createdAt BETWEEN :startDate AND :endDate
            """)
    BigDecimal sumByCategoryForMonth(
            @Param("categoryId") Integer categoryId,
            @Param("financialInfo") FinancialInfo financialInfo,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
