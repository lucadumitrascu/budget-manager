package ro.budgetmanager.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.UserDto;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.repository.UserRepository;

import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    public UserService(UserRepository userRepository,
                       AuthService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
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
}
