package ro.budgetmanager.service;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.FixedTransactionDto;
import ro.budgetmanager.entity.FixedTransaction;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.mapper.FixedTransactionMapper;
import ro.budgetmanager.repository.FixedTransactionRepository;

import java.util.List;
import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class FixedTransactionService {

    private final FixedTransactionRepository fixedTransactionRepository;
    private final FixedTransactionMapper fixedTransactionMapper;
    private final AuthService authService;

    public FixedTransactionService(FixedTransactionRepository fixedTransactionRepository,
                                   FixedTransactionMapper fixedTransactionMapper,
                                   AuthService authService) {
        this.fixedTransactionRepository = fixedTransactionRepository;
        this.fixedTransactionMapper = fixedTransactionMapper;
        this.authService = authService;
    }

    public ResponseEntity<ApiResponseDto<List<FixedTransactionDto>>> getFixedTransactions() {
        User user = authService.getAuthenticatedUser();
        List<FixedTransaction> fixedTransactions = fixedTransactionRepository
                .findByPlanner(user.getFinancialInfo().getPlanner());

        return buildResponse("Fixed transactions have been successfully retrieved.",
                fixedTransactionMapper.toFixedTransactionDtos(fixedTransactions), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<FixedTransactionDto>> createFixedTransaction(FixedTransactionDto fixedTransactionDto) {
        User user = authService.getAuthenticatedUser();

        FixedTransaction fixedTransaction = fixedTransactionMapper
                .toFixedTransaction(fixedTransactionDto, user.getFinancialInfo().getPlanner());
        fixedTransactionRepository.save(fixedTransaction);

        fixedTransactionDto = fixedTransactionMapper.toFixedTransactionDto(fixedTransaction);
        return buildResponse("Fixed transaction has been successfully added", fixedTransactionDto, HttpStatus.CREATED);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> updateFixedTransaction(Integer id, FixedTransactionDto fixedTransactionDto) {
        Optional<FixedTransaction> fixedTransactionOptional = fixedTransactionRepository.findById(id);
        if (fixedTransactionOptional.isEmpty()) {
            return buildResponse("Fixed transaction not found.", null, HttpStatus.NOT_FOUND);
        }
        FixedTransaction fixedTransaction = fixedTransactionOptional.get();
        applyFixedTransactionChanges(fixedTransaction, fixedTransactionDto);

        return buildResponse("Fixed transaction has been successfully updated.", null, HttpStatus.OK);
    }

    private void applyFixedTransactionChanges(FixedTransaction ft, FixedTransactionDto ftDto) {
        ft.setTitle(ftDto.getTitle());
        ft.setAmount(ftDto.getAmount());
        ft.setType(ftDto.getType());
        ft.setFrequency(ftDto.getFrequency());
        ft.setExecutionDay(ftDto.getExecutionDay());
        ft.setDestinationId(ftDto.getDestinationId());

        fixedTransactionRepository.save(ft);
    }

    @Transactional
    public ResponseEntity<ApiResponseDto<String>> deleteFixedTransaction(Integer id) {
        Optional<FixedTransaction> fixedTransactionOptional = fixedTransactionRepository.findById(id);
        if (fixedTransactionOptional.isEmpty()) {
            return buildResponse("Fixed transaction not found.", null, HttpStatus.NOT_FOUND);
        }

        fixedTransactionRepository.deleteById(id);
        return buildResponse("Fixed transaction has been successfully deleted.", null, HttpStatus.OK);
    }
}
