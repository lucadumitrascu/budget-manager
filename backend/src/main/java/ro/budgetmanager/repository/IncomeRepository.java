package ro.budgetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.budgetmanager.entity.Income;

import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Integer> {
    @Query("SELECT i FROM Income i WHERE i.incomeSource.financialInfo.id = :financialInfoId")
    List<Income> findIncomesByFinancialInfoId(@Param("financialInfoId") Integer financialInfoId);
}
