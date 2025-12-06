package ro.budgetmanager.dto;

public class ApiResponseDto<T> {
    private String message;
    private T data;

    public ApiResponseDto(String message) {
        this.message = message;
        this.data = null;
    }

    public ApiResponseDto(String message, T data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
