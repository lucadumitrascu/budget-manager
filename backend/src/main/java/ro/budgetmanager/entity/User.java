package ro.budgetmanager.entity;

import jakarta.persistence.*;
import ro.budgetmanager.enums.AuthProvider;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String username;

    @Column(nullable = false)
    private String email;

    @Column
    private String password;

    @Column(nullable = false)
    private LocalDateTime lastAccessTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider authProvider;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private FinancialInfo financialInfo;

    @PrePersist
    public void prePersist() {
        if (this.lastAccessTime == null) {
            this.lastAccessTime = LocalDateTime.now();
        }
    }

    public User(Integer id, String username, String email, String password, LocalDateTime lastAccessTime,
                AuthProvider authProvider, FinancialInfo financialInfo) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.lastAccessTime = lastAccessTime;
        this.authProvider = authProvider;
        this.financialInfo = financialInfo;
    }

    public User() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getLastAccessTime() {
        return lastAccessTime;
    }

    public void setLastAccessTime(LocalDateTime lastAccessTime) {
        this.lastAccessTime = lastAccessTime;
    }

    public AuthProvider getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(AuthProvider authProvider) {
        this.authProvider = authProvider;
    }

    public FinancialInfo getFinancialInfo() {
        return financialInfo;
    }

    public void setFinancialInfo(FinancialInfo financialInfo) {
        this.financialInfo = financialInfo;
    }
}
