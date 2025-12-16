package ro.budgetmanager.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.repository.UserRepository;

import java.util.Optional;

public class ApiUtils {

    public static User getAuthenticatedUser(UserRepository userRepository) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> userOptional = userRepository.findByEmail(authentication.getName());
        return userOptional.orElseThrow(() -> new RuntimeException("You are not authenticated."));
    }

    public static ResponseEntity<ApiResponseDto<String>> buildResponse(String message, String data, HttpStatus status) {
        ApiResponseDto<String> response = new ApiResponseDto<>(message, data);
        return ResponseEntity.status(status).body(response);
    }
}
