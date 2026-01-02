package ro.budgetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.budgetmanager.entity.Saving;

import java.util.List;

@Repository
public interface SavingRepository extends JpaRepository<Saving, Integer> {
    List<Saving> findByGoal_FinancialInfo_Id(Integer financialInfoId);
}
