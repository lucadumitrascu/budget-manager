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
import ro.budgetmanager.repository.UserRepository;

import static ro.budgetmanager.util.ApiUtils.buildResponse;
import static ro.budgetmanager.util.ApiUtils.getAuthenticatedUser;

@Service
public class FinancialInfoService {

    private final FinancialInfoRepository financialInfoRepository;
    private final UserRepository userRepository;

    public FinancialInfoService(FinancialInfoRepository financialInfoRepository,
                                UserRepository userRepository) {
        this.financialInfoRepository = financialInfoRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> updateFinancialInfo(FinancialInfoDto financialInfoDto) {
        User user = getAuthenticatedUser(userRepository);
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
}
