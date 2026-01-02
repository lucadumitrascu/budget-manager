package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.SavingDto;
import ro.budgetmanager.service.SavingService;

import java.util.List;

@RestController
@RequestMapping("/api/savings")
public class SavingController {

    private final SavingService savingService;

    public SavingController(SavingService savingService) {
        this.savingService = savingService;
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<SavingDto>>> getSavings() {
        return savingService.getSavings();
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<SavingDto>> createSaving(@Valid @RequestBody SavingDto savingDto) {
        return savingService.createSaving(savingDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> updateSaving(@PathVariable("id") Integer id, @Valid @RequestBody SavingDto savingDto) {
        return savingService.updateSaving(id, savingDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> deleteSaving(@PathVariable("id") Integer id) {
        return savingService.deleteSaving(id);
    }
}
