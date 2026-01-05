package ro.budgetmanager.service;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.FinancialInfoDto;
import ro.budgetmanager.entity.*;
import ro.budgetmanager.enums.FixedTransactionFrequency;
import ro.budgetmanager.enums.FixedTransactionType;
import ro.budgetmanager.repository.*;

import java.math.BigDecimal;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class FinancialInfoService {

    private final FinancialInfoRepository financialInfoRepository;
    private final GoalRepository goalRepository;
    private final IncomeRepository incomeRepository;
    private final IncomeSourceRepository incomeSourceRepository;
    private final FixedTransactionRepository fixedTransactionRepository;
    private final AuthService authService;

    public FinancialInfoService(FinancialInfoRepository financialInfoRepository,
                                GoalRepository goalRepository,
                                IncomeSourceRepository incomeSourceRepository,
                                IncomeRepository incomeRepository,
                                FixedTransactionRepository fixedTransactionRepository,
                                AuthService authService) {
        this.financialInfoRepository = financialInfoRepository;
        this.goalRepository = goalRepository;
        this.incomeSourceRepository = incomeSourceRepository;
        this.incomeRepository = incomeRepository;
        this.fixedTransactionRepository = fixedTransactionRepository;
        this.authService = authService;
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> updateFinancialInfo(FinancialInfoDto financialInfoDto) {
        User user = authService.getAuthenticatedUser();
        FinancialInfo financialInfo = user.getFinancialInfo();

        if (financialInfoDto.getBudget() != null) {
            financialInfo.setBudget(financialInfoDto.getBudget());
            createInitialIncomeSource(user.getFinancialInfo(), financialInfoDto.getBudget());
            createEmergencyFundGoal(financialInfo, financialInfoDto.getBudget());
        }

        if (financialInfoDto.getSalary() != null && financialInfoDto.getSalaryDay() != null) {
            createSalaryFixedTransaction(user.getFinancialInfo(), financialInfoDto.getSalary(), financialInfoDto.getSalaryDay());
        }

        if (financialInfoDto.getCurrency() != null) {
            financialInfo.setCurrency(financialInfoDto.getCurrency());
        }

        financialInfoRepository.save(financialInfo);
        return buildResponse("Financial information has been updated successfully.", null, HttpStatus.OK);
    }

    private void createEmergencyFundGoal(FinancialInfo financialInfo, BigDecimal budget) {
        if (goalRepository.findByNameAndFinancialInfo("Emergency Fund", financialInfo).isEmpty()) {
            BigDecimal minimumTarget = BigDecimal.valueOf(500);
            BigDecimal calculatedTarget = budget.multiply(BigDecimal.valueOf(0.15));
            BigDecimal finalTarget = calculatedTarget.compareTo(minimumTarget) < 0 ? minimumTarget : calculatedTarget;

            Goal emergencyFund = new Goal();
            emergencyFund.setName("Emergency Fund");
            emergencyFund.setTargetAmount(finalTarget);
            emergencyFund.setCurrentAmount(BigDecimal.ZERO);
            emergencyFund.setFinancialInfo(financialInfo);
            goalRepository.save(emergencyFund);
        }
    }

    private void createInitialIncomeSource(FinancialInfo financialInfo, BigDecimal budget) {
        if (incomeSourceRepository.findByNameAndFinancialInfo("Initial Budget", financialInfo).isEmpty()) {
            IncomeSource initialIncomeSource = new IncomeSource();
            initialIncomeSource.setName("Initial Budget");
            initialIncomeSource.setFinancialInfo(financialInfo);
            incomeSourceRepository.save(initialIncomeSource);

            Income initialIncome = new Income();
            initialIncome.setAmount(budget);
            initialIncome.setIncomeSource(initialIncomeSource);
            incomeRepository.save(initialIncome);
        }
    }

    private void createSalaryFixedTransaction(FinancialInfo financialInfo, BigDecimal salary, Integer salaryDay) {
        if (incomeSourceRepository.findByNameAndFinancialInfo("Salary", financialInfo).isEmpty()) {
            IncomeSource salaryIncomeSource = new IncomeSource();
            salaryIncomeSource.setName("Salary");
            salaryIncomeSource.setFinancialInfo(financialInfo);
            incomeSourceRepository.save(salaryIncomeSource);

            FixedTransaction salaryFixedTransaction = new FixedTransaction();
            salaryFixedTransaction.setTitle("Salary");
            salaryFixedTransaction.setType(FixedTransactionType.INCOME);
            salaryFixedTransaction.setFrequency(FixedTransactionFrequency.MONTHLY);
            salaryFixedTransaction.setDestinationId(salaryIncomeSource.getId());
            salaryFixedTransaction.setPlanner(financialInfo.getPlanner());
            salaryFixedTransaction.setAmount(salary);
            salaryFixedTransaction.setExecutionDay(salaryDay);

            fixedTransactionRepository.save(salaryFixedTransaction);
        }
    }

    public ResponseEntity<ApiResponseDto<String>> updateBudget(FinancialInfoDto financialInfoDto) {
        User user = authService.getAuthenticatedUser();
        user.getFinancialInfo().setBudget(financialInfoDto.getBudget());
        financialInfoRepository.save(user.getFinancialInfo());
        return buildResponse("Budget has been successfully updated.", null, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponseDto<String>> updateCurrency(FinancialInfoDto financialInfoDto) {
        User user = authService.getAuthenticatedUser();
        user.getFinancialInfo().setCurrency(financialInfoDto.getCurrency());
        financialInfoRepository.save(user.getFinancialInfo());
        return buildResponse("Currency has been successfully updated.", null, HttpStatus.OK);
    }

    protected void adjustUserBudget(User user, BigDecimal amountChange) {
        user.getFinancialInfo().setBudget(user.getFinancialInfo().getBudget().add(amountChange));
        financialInfoRepository.save(user.getFinancialInfo());
    }
}
