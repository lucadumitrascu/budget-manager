package ro.budgetmanager.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ro.budgetmanager.dto.ApiResponseDto;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDto<String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        String message = "Unknown validation error.";

        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            if (fieldError.getDefaultMessage() != null) {
                message = fieldError.getDefaultMessage();
                break;
            }
        }

        return buildResponse(message, null, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponseDto<String>> handleDataIntegrity(DataIntegrityViolationException ex) {
        String message = "Database error occurred.";

        if (ex.getCause() != null && ex.getCause().getCause() != null) {
            String causeMessage = ex.getCause().getCause().getMessage();
            if (causeMessage != null && causeMessage.contains("Out of range value")) {
                String column = "value";
                int start = causeMessage.indexOf("column '");
                if (start >= 0) {
                    start += 8;
                    int end = causeMessage.indexOf("'", start);
                    if (end > start) {
                        column = causeMessage.substring(start, end);
                    }
                }
                message = "This action would exceed the allowed limit for field: " + column + ".";
            }
        }

        return buildResponse(message, null, HttpStatus.BAD_REQUEST);
    }
}
