package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.EmailDto;
import ro.budgetmanager.dto.PasswordDto;
import ro.budgetmanager.dto.UserCredentialsDto;
import ro.budgetmanager.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDto<String>> register(@Valid @RequestBody UserCredentialsDto userCredentialsDto) {
        return authService.register(userCredentialsDto);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDto<String>> login(@Valid @RequestBody UserCredentialsDto userCredentialsDto) {
        return authService.login(userCredentialsDto);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponseDto<String>> forgotPassword(@Valid @RequestBody EmailDto emailDto) {
        return authService.forgotPassword(emailDto.getEmail());
    }

    @PutMapping("/reset-password")
    public ResponseEntity<ApiResponseDto<String>> resetPassword(@RequestHeader("Authorization") String authHeader,
                                                                @Valid @RequestBody PasswordDto passwordDto) {
        return authService.resetPassword(authHeader, passwordDto.getPassword());
    }
}
