package ro.budgetmanager.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.UserCredentialsDto;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.repository.UserRepository;
import ro.budgetmanager.security.JwtTokenGenerator;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       AuthenticationManager authenticationManager,
                       JwtTokenGenerator jwtTokenGenerator,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenGenerator = jwtTokenGenerator;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<ApiResponseDto<String>> login(UserCredentialsDto userCredentialsDto) {
        return authenticateUserAndGenerateToken(userCredentialsDto.getEmail(), userCredentialsDto.getPassword(),
                HttpStatus.OK, "Invalid username or password.");
    }

    public ResponseEntity<ApiResponseDto<String>> register(UserCredentialsDto userCredentialsDto) {
        if (userRepository.existsByEmail(userCredentialsDto.getEmail())) {
            ApiResponseDto<String> response = new ApiResponseDto<>("Email is already in use.", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        createAccount(userCredentialsDto.getEmail(), userCredentialsDto.getPassword());
        return authenticateUserAndGenerateToken(userCredentialsDto.getEmail(), userCredentialsDto.getPassword(),
                HttpStatus.CREATED, "Authentication failed after registration.");
    }

    private ResponseEntity<ApiResponseDto<String>> authenticateUserAndGenerateToken(String email, String password, HttpStatus successStatus, String errorMessage) {
        ApiResponseDto<String> response;
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            String token = jwtTokenGenerator.generateToken(email);
            response = new ApiResponseDto<>(null, token);
            return ResponseEntity.status(successStatus).body(response);
        } catch (AuthenticationException e) {
            response = new ApiResponseDto<>(errorMessage, null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            response = new ApiResponseDto<>("An unexpected error occurred.", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private void createAccount(String email, String password) {
        User newUser = new User();
        newUser.setUsername(null);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        userRepository.save(newUser);
    }
}