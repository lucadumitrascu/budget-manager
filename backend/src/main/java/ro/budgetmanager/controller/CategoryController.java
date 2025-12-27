package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.CategoryDto;
import ro.budgetmanager.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<CategoryDto>>> getCategories() {
        return categoryService.getCategories();
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<CategoryDto>> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
        return categoryService.createCategory(categoryDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> updateCategory(@PathVariable("id") Integer id, @Valid @RequestBody CategoryDto categoryDto) {
        return categoryService.updateCategory(id, categoryDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> deleteCategory(@PathVariable("id") Integer id) {
        return categoryService.deleteCategory(id);
    }
}
