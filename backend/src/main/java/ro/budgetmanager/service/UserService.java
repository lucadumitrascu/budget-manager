package ro.budgetmanager.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.UserDto;
import ro.budgetmanager.entity.FinancialInfo;
import ro.budgetmanager.entity.Planner;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.mapper.UserMapper;
import ro.budgetmanager.repository.FinancialInfoRepository;
import ro.budgetmanager.repository.UserRepository;

import java.math.BigDecimal;
import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final FinancialInfoRepository financialInfoRepository;
    private final AuthService authService;

    public UserService(UserRepository userRepository,
                       UserMapper userMapper,
                       FinancialInfoRepository financialInfoRepository,
                       AuthService authService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.financialInfoRepository = financialInfoRepository;
        this.authService = authService;
    }

    public ResponseEntity<ApiResponseDto<UserDto>> getUserData() {
        User user = authService.getAuthenticatedUser();
        UserDto userDto = userMapper.toUserDto(user);
        return buildResponse("User data have been successfully retrieved.", userDto, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponseDto<String>> updateUsername(UserDto userDto) {
        User user = authService.getAuthenticatedUser();

        String username = userDto.getUsername().trim();
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            return buildResponse("Username is already taken.", null, HttpStatus.BAD_REQUEST);
        }

        user.setUsername(username);
        userRepository.save(user);

        return buildResponse("Username has been updated successfully.", null, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponseDto<String>> deleteUser() {
        User user = authService.getAuthenticatedUser();
        userRepository.delete(user);
        return buildResponse("Account has been successfully deleted.", null, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponseDto<String>> resetUserData() {
        User user = authService.getAuthenticatedUser();
        resetFinancialInfoData(user.getFinancialInfo());
        financialInfoRepository.save(user.getFinancialInfo());
        return buildResponse("Account data has been successfully reset.", null, HttpStatus.OK);
    }

    private void resetFinancialInfoData(FinancialInfo financialInfo) {
        financialInfo.setBudget(BigDecimal.valueOf(0.00));
        financialInfo.setCurrency("RON");

        financialInfo.getCategories().clear();
        financialInfo.getIncomeSources().clear();
        financialInfo.getGoals().clear();

        Planner planner = financialInfo.getPlanner();
        if (planner != null) {
            planner.setMonthlyBudget(BigDecimal.ZERO);
            planner.setSelectedGoal(null);
            planner.getFixedTransactions().clear();
        }
    }
}
