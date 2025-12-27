package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.ExpenseDto;
import ro.budgetmanager.service.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<ExpenseDto>>> getExpenses() {
        return expenseService.getExpenses();
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<ExpenseDto>> createExpense(@Valid @RequestBody ExpenseDto expenseDto) {
        return expenseService.createExpense(expenseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> updateExpense(@PathVariable("id") Integer id, @Valid @RequestBody ExpenseDto expenseDto) {
        return expenseService.updateExpense(id, expenseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> deleteExpense(@PathVariable("id") Integer id) {
        return expenseService.deleteExpense(id);
    }
}
