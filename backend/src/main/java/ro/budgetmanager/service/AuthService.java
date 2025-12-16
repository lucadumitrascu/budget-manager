package ro.budgetmanager.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.budgetmanager.dto.ApiResponseDto;
import ro.budgetmanager.dto.UserCredentialsDto;
import ro.budgetmanager.entity.FinancialInfo;
import ro.budgetmanager.entity.User;
import ro.budgetmanager.repository.UserRepository;
import ro.budgetmanager.security.JwtTokenGenerator;

import java.math.BigDecimal;
import java.util.Optional;

import static ro.budgetmanager.util.ApiUtils.buildResponse;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
                       AuthenticationManager authenticationManager,
                       JwtTokenGenerator jwtTokenGenerator,
                       PasswordEncoder passwordEncoder,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenGenerator = jwtTokenGenerator;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public ResponseEntity<ApiResponseDto<String>> login(UserCredentialsDto userCredentialsDto) {
        return authenticateUserAndGenerateToken(userCredentialsDto.getEmail(), userCredentialsDto.getPassword(),
                HttpStatus.OK, "Invalid username or password.");
    }

    public ResponseEntity<ApiResponseDto<String>> register(UserCredentialsDto userCredentialsDto) {
        if (userRepository.existsByEmail(userCredentialsDto.getEmail())) {
            return buildResponse("Email is already in use.", null, HttpStatus.BAD_REQUEST);
        }
        createAccount(userCredentialsDto.getEmail(), userCredentialsDto.getPassword());
        return authenticateUserAndGenerateToken(userCredentialsDto.getEmail(), userCredentialsDto.getPassword(),
                HttpStatus.CREATED, "Authentication failed after registration.");
    }

    public ResponseEntity<ApiResponseDto<String>> forgotPassword(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return buildResponse("Email not found.", null, HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        String token = jwtTokenGenerator.generateToken(user.getEmail(), true);

        String resetLink = "http://localhost:5173/authentication/reset-password?token=" + token;
        String username = user.getUsername() != null ? user.getUsername() : "User";
        String subject = "Reset Your Password";
        String body = "Hello " + username + ",\n\n"
                + "Click the link below to reset your password:\n"
                + resetLink + "\n\n"
                + "This link will expire in 10 minutes.";

        emailService.sendEmail(email, subject, body);

        return buildResponse("Password reset link has been sent successfully.", null, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponseDto<String>> resetPassword(String authHeader, String newPassword) {
        String token = authHeader.replace("Bearer ", "").trim();
        if (!jwtTokenGenerator.isTokenValid(token, true)) {
            return buildResponse("Invalid or expired token.", null, HttpStatus.UNAUTHORIZED);
        }

        String email = jwtTokenGenerator.getEmailFromJwt(token);
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return buildResponse("User not found.", null, HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return buildResponse("Password has been reset successfully.", null, HttpStatus.OK);
    }

    private ResponseEntity<ApiResponseDto<String>> authenticateUserAndGenerateToken(String email, String password, HttpStatus successStatus, String errorMessage) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            String token = jwtTokenGenerator.generateToken(email, false);
            return buildResponse(null, token, successStatus);
        } catch (AuthenticationException e) {
            return buildResponse(errorMessage, null, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return buildResponse("An unexpected error occurred.", null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void createAccount(String email, String password) {
        User newUser = new User();
        newUser.setUsername(null);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));

        FinancialInfo financialInfo = new FinancialInfo();
        financialInfo.setBudget(BigDecimal.ZERO);
        financialInfo.setCurrency("RON");
        financialInfo.setSalary(BigDecimal.ZERO);
        financialInfo.setSalaryDay(0);
        financialInfo.setUser(newUser);

        newUser.setFinancialInfo(financialInfo);
        userRepository.save(newUser);
    }
}
