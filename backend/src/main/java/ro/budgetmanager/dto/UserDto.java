package ro.budgetmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserDto {

    @NotBlank(message = "Username is required.")
    @Size(max = 50, message = "Username must be at most 50 characters.")
    private String username;

    private FinancialInfoDto financialInfo;

    public UserDto(String username) {
        this.username = username;
    }

    public UserDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public FinancialInfoDto getFinancialInfo() {
        return financialInfo;
    }

    public void setFinancialInfo(FinancialInfoDto financialInfo) {
        this.financialInfo = financialInfo;
    }
}
