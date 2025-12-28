package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.IncomeSourceDto;
import ro.budgetmanager.service.IncomeSourceService;

import java.util.List;

@RestController
@RequestMapping("/api/income-sources")
public class IncomeSourceController {

    private final IncomeSourceService incomeSourceService;

    public IncomeSourceController(IncomeSourceService incomeSourceService) {
        this.incomeSourceService = incomeSourceService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<IncomeSourceDto>>> getIncomeSources() {
        return incomeSourceService.getIncomeSources();
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<IncomeSourceDto>> createIncomeSource(@Valid @RequestBody IncomeSourceDto incomeSourceDto) {
        return incomeSourceService.createIncomeSource(incomeSourceDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> updateIncomeSource(@PathVariable("id") Integer id, @Valid @RequestBody IncomeSourceDto incomeSourceDto) {
        return incomeSourceService.updateIncomeSource(id, incomeSourceDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> deleteIncomeSource(@PathVariable("id") Integer id) {
        return incomeSourceService.deleteIncomeSource(id);
    }
}
