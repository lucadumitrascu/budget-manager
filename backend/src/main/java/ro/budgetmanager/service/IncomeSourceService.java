package ro.budgetmanager.service;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.IncomeSourceDto;
import ro.budgetmanager.entity.*;
import ro.budgetmanager.mapper.IncomeSourceMapper;
import ro.budgetmanager.repository.IncomeSourceRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class IncomeSourceService {

    private final IncomeSourceRepository incomeSourceRepository;
    private final IncomeSourceMapper incomeSourceMapper;
    private final FinancialInfoService financialInfoService;
    private final AuthService authService;

    public IncomeSourceService(IncomeSourceRepository incomeSourceRepository,
                               IncomeSourceMapper incomeSourceMapper,
                               FinancialInfoService financialInfoService,
                               AuthService authService) {
        this.incomeSourceRepository = incomeSourceRepository;
        this.incomeSourceMapper = incomeSourceMapper;
        this.financialInfoService = financialInfoService;
        this.authService = authService;
    }

    public ResponseEntity<ApiResponseDto<List<IncomeSourceDto>>> getIncomeSources() {
        User user = authService.getAuthenticatedUser();

        return buildResponse("Income sources have been successfully retrieved.",
                incomeSourceMapper.toIncomeSourceDtos(user.getFinancialInfo().getIncomeSources()), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponseDto<IncomeSourceDto>> createIncomeSource(IncomeSourceDto incomeSourceDto) {
        User user = authService.getAuthenticatedUser();

        if (isDuplicateIncomeSource(user, incomeSourceDto.getName(), null)) {
            return buildResponse("Income source with this name already exists.", null, HttpStatus.BAD_REQUEST);
        }

        IncomeSource incomeSource = incomeSourceMapper.toIncomeSource(incomeSourceDto, user.getFinancialInfo());
        incomeSourceRepository.save(incomeSource);

        incomeSourceDto = incomeSourceMapper.toIncomeSourceDto(incomeSource);
        return buildResponse("Income source has been successfully added.", incomeSourceDto, HttpStatus.CREATED);
    }

    public ResponseEntity<ApiResponseDto<String>> updateIncomeSource(Integer id, IncomeSourceDto incomeSourceDto) {
        User user = authService.getAuthenticatedUser();

        Optional<IncomeSource> incomeSourceOptional = incomeSourceRepository
                .findByIdAndFinancialInfo(id, user.getFinancialInfo());
        if (incomeSourceOptional.isEmpty()) {
            return buildResponse("Income source not found.", null, HttpStatus.NOT_FOUND);
        }
        IncomeSource incomeSource = incomeSourceOptional.get();

        if (isDuplicateIncomeSource(user, incomeSourceDto.getName(), id)) {
            return buildResponse("Income source with this name already exists.", null, HttpStatus.BAD_REQUEST);
        }
        incomeSource.setName(incomeSourceDto.getName());
        incomeSourceRepository.save(incomeSource);
        return buildResponse("Income source has been successfully updated.", null, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> deleteIncomeSource(Integer id) {
        User user = authService.getAuthenticatedUser();

        Optional<IncomeSource> incomeSourceOptional = incomeSourceRepository
                .findByIdAndFinancialInfo(id, user.getFinancialInfo());
        if (incomeSourceOptional.isEmpty()) {
            return buildResponse("Income source not found.", null, HttpStatus.NOT_FOUND);
        }

        IncomeSource incomeSource = incomeSourceOptional.get();
        refundIncomesToBudget(incomeSource, user);
        incomeSourceRepository.deleteById(id);
        return buildResponse("Income source has been successfully deleted.", null, HttpStatus.OK);
    }

    private boolean isDuplicateIncomeSource(User user, String name, Integer excludeId) {
        return user.getFinancialInfo().getIncomeSources().stream()
                .filter(i -> excludeId == null || !excludeId.equals(i.getId()))
                .anyMatch(i -> i.getName().equalsIgnoreCase(name));
    }

    private void refundIncomesToBudget(IncomeSource incomeSource, User user) {
        List<Income> incomes = incomeSource.getIncomes();
        if (incomes != null && !incomes.isEmpty()) {
            BigDecimal incomesSum = incomes.stream()
                    .map(Income::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            financialInfoService.adjustUserBudget(user, incomesSum.negate());
        }
    }
}
