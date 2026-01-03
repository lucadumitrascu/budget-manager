package ro.budgetmanager.mapper;

import org.springframework.stereotype.Component;
import ro.budgetmanager.dto.FixedTransactionDto;
import ro.budgetmanager.entity.FixedTransaction;
import ro.budgetmanager.entity.Planner;

import java.util.List;

@Component
public class FixedTransactionMapper {

    public FixedTransaction toFixedTransaction(FixedTransactionDto fixedTransactionDto, Planner planner) {
        FixedTransaction fixedTransaction = new FixedTransaction();
        fixedTransaction.setId(fixedTransactionDto.getId());
        fixedTransaction.setTitle(fixedTransactionDto.getTitle());
        fixedTransaction.setType(fixedTransactionDto.getType());
        fixedTransaction.setAmount(fixedTransactionDto.getAmount());
        fixedTransaction.setFrequency(fixedTransactionDto.getFrequency());
        fixedTransaction.setExecutionDay(fixedTransactionDto.getExecutionDay());
        fixedTransaction.setDestinationId(fixedTransactionDto.getDestinationId());
        fixedTransaction.setPlanner(planner);
        return fixedTransaction;
    }

    public FixedTransactionDto toFixedTransactionDto(FixedTransaction fixedTransaction) {
        FixedTransactionDto fixedTransactionDto = new FixedTransactionDto();
        fixedTransactionDto.setId(fixedTransaction.getId());
        fixedTransactionDto.setTitle(fixedTransaction.getTitle());
        fixedTransactionDto.setType(fixedTransaction.getType());
        fixedTransactionDto.setAmount(fixedTransaction.getAmount());
        fixedTransactionDto.setFrequency(fixedTransaction.getFrequency());
        fixedTransactionDto.setExecutionDay(fixedTransaction.getExecutionDay());
        fixedTransactionDto.setDestinationId(fixedTransaction.getDestinationId());
        return fixedTransactionDto;
    }

    public List<FixedTransactionDto> toFixedTransactionDtos(List<FixedTransaction> fixedTransactions) {
        if (fixedTransactions == null) return List.of();
        return fixedTransactions.stream()
                .map(this::toFixedTransactionDto)
                .toList();
    }
}
