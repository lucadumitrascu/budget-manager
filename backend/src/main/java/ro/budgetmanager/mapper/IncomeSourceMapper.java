package ro.budgetmanager.mapper;

import org.springframework.stereotype.Component;
import ro.budgetmanager.dto.IncomeSourceDto;
import ro.budgetmanager.entity.FinancialInfo;
import ro.budgetmanager.entity.IncomeSource;

import java.util.List;

@Component
public class IncomeSourceMapper {

    public IncomeSource toIncomeSource(IncomeSourceDto incomeSourceDto, FinancialInfo financialInfo) {
        IncomeSource incomeSource = new IncomeSource();
        incomeSource.setName(incomeSourceDto.getName());
        incomeSource.setFinancialInfo(financialInfo);
        return incomeSource;
    }

    public IncomeSourceDto toIncomeSourceDto(IncomeSource incomeSource) {
        IncomeSourceDto incomeSourceDto = new IncomeSourceDto();
        incomeSourceDto.setId(incomeSource.getId());
        incomeSourceDto.setName(incomeSource.getName());
        incomeSourceDto.setCreatedAt(incomeSource.getCreatedAt());
        return incomeSourceDto;
    }

    public List<IncomeSourceDto> toIncomeSourceDtos(List<IncomeSource> incomeSources) {
        if (incomeSources == null) return List.of();
        return incomeSources.stream()
                .map(this::toIncomeSourceDto)
                .toList();
    }
}
