package ro.budgetmanager.mapper;

import org.springframework.stereotype.Component;
import ro.budgetmanager.dto.FinancialInfoDto;
import ro.budgetmanager.entity.FinancialInfo;

@Component
public class FinancialInfoMapper {

    public FinancialInfoDto toFinancialInfoDto(FinancialInfo financialInfo) {
        FinancialInfoDto financialInfoDto = new FinancialInfoDto();
        financialInfoDto.setBudget(financialInfo.getBudget());
        financialInfoDto.setCurrency(financialInfo.getCurrency());
        financialInfoDto.setSalary(financialInfo.getSalary());
        financialInfoDto.setSalaryDay(financialInfo.getSalaryDay());
        return financialInfoDto;
    }
}
