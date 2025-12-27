package ro.budgetmanager.mapper;

import org.springframework.stereotype.Component;
import ro.budgetmanager.dto.UserDto;
import ro.budgetmanager.entity.User;

@Component
public class UserMapper {

    private final FinancialInfoMapper financialInfoMapper;

    public UserMapper(FinancialInfoMapper financialInfoMapper) {
        this.financialInfoMapper = financialInfoMapper;
    }

    public UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setFinancialInfo(financialInfoMapper.toFinancialInfoDto(user.getFinancialInfo()));
        return userDto;
    }
}
