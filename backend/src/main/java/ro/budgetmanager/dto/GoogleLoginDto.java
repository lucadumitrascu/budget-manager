package ro.budgetmanager.dto;

public class GoogleLoginDto {
    private String authCode;

    public GoogleLoginDto(String authCode) {
        this.authCode = authCode;
    }

    public String getAuthCode() {
        return authCode;
    }

    public void setAuthCode(String authCode) {
        this.authCode = authCode;
    }
}
