package ro.budgetmanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ro.budgetmanager.dto.ApiResponseDto;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDto<String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        ApiResponseDto<String> response = new ApiResponseDto<>("Unknown validation error.");

        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            if (fieldError.getDefaultMessage() != null) {
                response.setMessage(fieldError.getDefaultMessage());
                break;
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
