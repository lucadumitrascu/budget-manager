package ro.budgetmanager.service;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.IncomeDto;
import ro.budgetmanager.entity.*;
import ro.budgetmanager.mapper.IncomeMapper;
import ro.budgetmanager.repository.IncomeRepository;
import ro.budgetmanager.repository.IncomeSourceRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;
import static ro.budgetmanager.util.DateUtils.getDateIntervalFromPeriod;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final IncomeMapper incomeMapper;
    private final IncomeSourceRepository incomeSourceRepository;
    private final FinancialInfoService financialInfoService;
    private final AuthService authService;

    public IncomeService(IncomeRepository incomeRepository,
                         IncomeMapper incomeMapper,
                         IncomeSourceRepository incomeSourceRepository,
                         FinancialInfoService financialInfoService,
                         AuthService authService) {

        this.incomeRepository = incomeRepository;
        this.incomeMapper = incomeMapper;
        this.incomeSourceRepository = incomeSourceRepository;
        this.financialInfoService = financialInfoService;
        this.authService = authService;
    }

    public ResponseEntity<ApiResponseDto<List<IncomeDto>>> getIncomes(String period) {
        User user = authService.getAuthenticatedUser();
        LocalDateTime[] dateInterval = getDateIntervalFromPeriod(period);
        LocalDateTime startDate = dateInterval[0];
        LocalDateTime endDate = dateInterval[1];

        List<Income> filteredIncomes = incomeRepository
                .findByIncomeSource_FinancialInfoAndCreatedAtBetween(user.getFinancialInfo(), startDate, endDate);

        return buildResponse("Incomes have been successfully retrieved.",
                incomeMapper.toIncomeDtos(filteredIncomes), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<IncomeDto>> createIncome(IncomeDto incomeDto) {
        User user = authService.getAuthenticatedUser();

        Optional<IncomeSource> incomeSourceOptional = incomeSourceRepository
                .findByNameAndFinancialInfo(incomeDto.getIncomeSource(), user.getFinancialInfo());
        if (incomeSourceOptional.isEmpty()) {
            return buildResponse("Income source not found.", null, HttpStatus.NOT_FOUND);
        }
        IncomeSource incomeSource = incomeSourceOptional.get();

        Income income = incomeMapper.toIncome(incomeDto, incomeSource);
        incomeRepository.save(income);

        financialInfoService.adjustUserBudget(user, incomeDto.getAmount());

        incomeDto = incomeMapper.toIncomeDto(income);
        return buildResponse("Income has been successfully added.", incomeDto, HttpStatus.CREATED);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> updateIncome(Integer id, IncomeDto incomeDto) {
        User user = authService.getAuthenticatedUser();

        Optional<Income> incomeOptional = incomeRepository.findById(id);
        if (incomeOptional.isEmpty()) {
            return buildResponse("Income not found.", null, HttpStatus.NOT_FOUND);
        }
        Income income = incomeOptional.get();

        Optional<IncomeSource> incomeSourceOptional = incomeSourceRepository
                .findByNameAndFinancialInfo(incomeDto.getIncomeSource(), user.getFinancialInfo());
        if (incomeSourceOptional.isEmpty()) {
            return buildResponse("Income source not found.", null, HttpStatus.NOT_FOUND);
        }
        IncomeSource incomeSource = incomeSourceOptional.get();

        applyIncomeChanges(income, incomeDto, user, incomeSource);

        return buildResponse("Income has been successfully updated.", null, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> deleteIncome(Integer id) {
        User user = authService.getAuthenticatedUser();

        Optional<Income> incomeOptional = incomeRepository.findById(id);
        if (incomeOptional.isEmpty()) {
            return buildResponse("Income not found.", null, HttpStatus.NOT_FOUND);
        }
        Income income = incomeOptional.get();

        financialInfoService.adjustUserBudget(user, income.getAmount().negate());
        incomeRepository.deleteById(id);
        return buildResponse("Income has been successfully deleted.", null, HttpStatus.OK);
    }

    private void applyIncomeChanges(Income income, IncomeDto incomeDto, User user, IncomeSource incomeSource) {
        BigDecimal difference = incomeDto.getAmount().subtract(income.getAmount());

        if (difference.compareTo(BigDecimal.ZERO) != 0) {
            financialInfoService.adjustUserBudget(user, difference);
            income.setAmount(incomeDto.getAmount());
        }

        income.setIncomeSource(incomeSource);
        incomeRepository.save(income);
    }
}