package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.IncomeDto;
import ro.budgetmanager.service.IncomeService;

import java.util.List;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<IncomeDto>>> getIncomes(@RequestParam(defaultValue = "last30") String period) {
        return incomeService.getIncomes(period);
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<IncomeDto>> createIncome(@Valid @RequestBody IncomeDto incomeDto) {
        return incomeService.createIncome(incomeDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> updateIncome(@PathVariable("id") Integer id, @Valid @RequestBody IncomeDto incomeDto) {
        return incomeService.updateIncome(id, incomeDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> deleteIncome(@PathVariable("id") Integer id) {
        return incomeService.deleteIncome(id);
    }
}
