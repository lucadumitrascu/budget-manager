package ro.budgetmanager.service;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.CategoryDto;
import ro.budgetmanager.entity.Category;
import ro.budgetmanager.entity.Expense;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.mapper.CategoryMapper;
import ro.budgetmanager.repository.CategoryRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final FinancialInfoService financialInfoService;
    private final AuthService authService;

    public CategoryService(CategoryRepository categoryRepository,
                           CategoryMapper categoryMapper,
                           FinancialInfoService financialInfoService,
                           AuthService authService) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
        this.financialInfoService = financialInfoService;
        this.authService = authService;
    }

    public ResponseEntity<ApiResponseDto<List<CategoryDto>>> getCategories() {
        User user = authService.getAuthenticatedUser();

        return buildResponse("Categories have been successfully retrieved.",
                categoryMapper.toCategoryDtos(user.getFinancialInfo().getCategories()), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponseDto<CategoryDto>> createCategory(CategoryDto categoryDto) {
        User user = authService.getAuthenticatedUser();

        if (isCategoryDuplicate(user, categoryDto.getName(), null)) {
            return buildResponse("Category with this name already exists.", null, HttpStatus.BAD_REQUEST);
        }

        Category category = categoryMapper.toCategory(categoryDto, user.getFinancialInfo());
        categoryRepository.save(category);

        categoryDto = categoryMapper.toCategoryDto(category);
        return buildResponse("Category has been successfully added.", categoryDto, HttpStatus.CREATED);
    }

    public ResponseEntity<ApiResponseDto<String>> updateCategory(Integer id, CategoryDto categoryDto) {
        User user = authService.getAuthenticatedUser();

        Optional<Category> categoryOptional = categoryRepository
                .findByIdAndFinancialInfo(id, user.getFinancialInfo());
        if (categoryOptional.isEmpty()) {
            return buildResponse("Category not found.", null, HttpStatus.NOT_FOUND);
        }
        Category category = categoryOptional.get();

        if (isCategoryDuplicate(user, categoryDto.getName(), id)) {
            return buildResponse("Category with this name already exists.", null, HttpStatus.BAD_REQUEST);
        }
        category.setName(categoryDto.getName());
        categoryRepository.save(category);
        return buildResponse("Category has been successfully updated.", null, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> deleteCategory(Integer id) {
        User user = authService.getAuthenticatedUser();

        Optional<Category> categoryOptional = categoryRepository
                .findByIdAndFinancialInfo(id, user.getFinancialInfo());
        if (categoryOptional.isEmpty()) {
            return buildResponse("Category not found.", null, HttpStatus.NOT_FOUND);
        }

        Category category = categoryOptional.get();
        refundExpensesToBudget(category, user);
        categoryRepository.deleteById(id);
        return buildResponse("Category has been successfully deleted.", null, HttpStatus.OK);
    }

    private boolean isCategoryDuplicate(User user, String name, Integer excludeId) {
        return user.getFinancialInfo().getCategories().stream()
                .filter(c -> excludeId == null || !excludeId.equals(c.getId()))
                .anyMatch(c -> c.getName().equalsIgnoreCase(name));
    }

    private void refundExpensesToBudget(Category category, User user) {
        List<Expense> expenses = category.getExpenses();
        if (expenses != null && !expenses.isEmpty()) {
            BigDecimal expensesSum = expenses.stream()
                    .map(Expense::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            financialInfoService.adjustUserBudget(user, expensesSum);
        }
    }
}
