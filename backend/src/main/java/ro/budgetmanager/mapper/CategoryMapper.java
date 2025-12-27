package ro.budgetmanager.mapper;

import org.springframework.stereotype.Component;
import ro.budgetmanager.dto.CategoryDto;
import ro.budgetmanager.entity.Category;
import ro.budgetmanager.entity.FinancialInfo;

import java.util.List;

@Component
public class CategoryMapper {

    public Category toCategory(CategoryDto categoryDto, FinancialInfo financialInfo) {
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setFinancialInfo(financialInfo);
        return category;
    }

    public CategoryDto toCategoryDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        categoryDto.setCreatedAt(category.getCreatedAt());
        return categoryDto;
    }

    public List<CategoryDto> toCategoryDtos(List<Category> categories) {
        if (categories == null) return List.of();
        return categories.stream()
                .map(this::toCategoryDto)
                .toList();
    }
}
