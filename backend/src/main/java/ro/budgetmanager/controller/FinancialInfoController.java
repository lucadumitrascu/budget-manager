package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.FinancialInfoDto;
import ro.budgetmanager.service.FinancialInfoService;

@RestController
@RequestMapping("/api/financial-info")
public class FinancialInfoController {

    private final FinancialInfoService financialInfoService;

    public FinancialInfoController(FinancialInfoService financialInfoService) {
        this.financialInfoService = financialInfoService;
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponseDto<String>> updateFinancialInfo(@Valid @RequestBody FinancialInfoDto financialInfoDto) {
        return financialInfoService.updateFinancialInfo(financialInfoDto);
    }
}
