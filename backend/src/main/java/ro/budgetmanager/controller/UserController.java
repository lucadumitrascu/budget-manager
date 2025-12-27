package ro.budgetmanager.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.UserDto;
import ro.budgetmanager.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponseDto<UserDto>> getUserData() {
        return userService.getUserData();
    }

    @PutMapping("/me/username")
    public ResponseEntity<ApiResponseDto<String>> updateUsername(@Valid @RequestBody UserDto userDto) {
        return userService.updateUsername(userDto);
    }
}
