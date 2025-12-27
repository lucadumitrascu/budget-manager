package ro.budgetmanager.service;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.FinancialInfoDto;
import ro.budgetmanager.entity.FinancialInfo;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.repository.FinancialInfoRepository;

import java.math.BigDecimal;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class FinancialInfoService {

    private final FinancialInfoRepository financialInfoRepository;
    private final AuthService authService;

    public FinancialInfoService(FinancialInfoRepository financialInfoRepository,
                                AuthService authService) {
        this.financialInfoRepository = financialInfoRepository;
        this.authService = authService;
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> updateFinancialInfo(FinancialInfoDto financialInfoDto) {
        User user = authService.getAuthenticatedUser();
        FinancialInfo financialInfo = user.getFinancialInfo();

        if (financialInfoDto.getBudget() != null) {
            financialInfo.setBudget(financialInfoDto.getBudget());
        }
        if (financialInfoDto.getCurrency() != null) {
            financialInfo.setCurrency(financialInfoDto.getCurrency());
        }
        if (financialInfoDto.getSalary() != null) {
            financialInfo.setSalary(financialInfoDto.getSalary());
        }
        if (financialInfoDto.getSalaryDay() != null) {
            financialInfo.setSalaryDay(financialInfoDto.getSalaryDay());
        }

        financialInfoRepository.save(financialInfo);

        return buildResponse("Financial information has been updated successfully.", null, HttpStatus.OK);
    }

    protected void adjustUserBudget(User user, BigDecimal amountChange) {
        user.getFinancialInfo().setBudget(user.getFinancialInfo().getBudget().add(amountChange));
        financialInfoRepository.save(user.getFinancialInfo());
    }
}
