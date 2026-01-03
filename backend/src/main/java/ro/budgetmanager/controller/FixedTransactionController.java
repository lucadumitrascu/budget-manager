package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.FixedTransactionDto;
import ro.budgetmanager.service.FixedTransactionService;

import java.util.List;

@RestController
@RequestMapping("/api/fixed-transactions")
public class FixedTransactionController {

    private final FixedTransactionService fixedTransactionService;

    public FixedTransactionController(FixedTransactionService fixedTransactionService) {
        this.fixedTransactionService = fixedTransactionService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<FixedTransactionDto>>> getFixedTransactions() {
        return fixedTransactionService.getFixedTransactions();
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<FixedTransactionDto>> createFixedTransaction(@Valid @RequestBody FixedTransactionDto fixedTransactionDto) {
        return fixedTransactionService.createFixedTransaction(fixedTransactionDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> updateFixedTransaction(@PathVariable("id") Integer id, @Valid @RequestBody FixedTransactionDto fixedTransactionDto) {
        return fixedTransactionService.updateFixedTransaction(id, fixedTransactionDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> deleteFixedTransaction(@PathVariable("id") Integer id) {
        return fixedTransactionService.deleteFixedTransaction(id);
    }
}
