package ro.budgetmanager.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ro.budgetmanager.dto.ApiResponseDto;

public class ApiUtils {
    public static <T> ResponseEntity<ApiResponseDto<T>> buildResponse(String message, T data, HttpStatus status) {
        ApiResponseDto<T> response = new ApiResponseDto<>(message, data);
        return ResponseEntity.status(status).body(response);
    }
}
