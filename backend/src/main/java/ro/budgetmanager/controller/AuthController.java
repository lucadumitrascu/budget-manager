package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
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
}
