package ro.budgetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.budgetmanager.entity.Category;
import ro.budgetmanager.entity.FinancialInfo;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByNameAndFinancialInfo(String name, FinancialInfo financialInfo);

    Optional<Category> findByIdAndFinancialInfo(Integer id, FinancialInfo financialInfo);
}
