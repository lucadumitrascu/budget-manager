package ro.budgetmanager.mapper;

import org.springframework.stereotype.Component;
import ro.budgetmanager.dto.IncomeDto;
import ro.budgetmanager.entity.Income;
import ro.budgetmanager.entity.IncomeSource;

import java.util.List;

@Component
public class IncomeMapper {

    public Income toIncome(IncomeDto incomeDto, IncomeSource incomeSource) {
        Income income = new Income();
        income.setAmount(incomeDto.getAmount());
        income.setIncomeSource(incomeSource);
        return income;
    }

    public IncomeDto toIncomeDto(Income income) {
        IncomeDto incomeDto = new IncomeDto();
        incomeDto.setId(income.getId());
        incomeDto.setAmount(income.getAmount());
        incomeDto.setIncomeSource(income.getIncomeSource().getName());
        incomeDto.setCreatedAt(income.getCreatedAt());
        return incomeDto;
    }

    public List<IncomeDto> toIncomeDtos(List<Income> incomes) {
        if (incomes == null) return List.of();
        return incomes.stream()
                .map(this::toIncomeDto)
                .toList();
    }
}
