import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/auth";

export const authenticateUser = async (email, password) => {
    const result = await makeRequest(API_BASE_URL, "/login", "POST", { email, password });
    if (result.success) {
        localStorage.setItem("jwtToken", result.data);
    }
    return result;
};

export const createAccount = async (email, password) => {
    const result = await makeRequest(API_BASE_URL, "/register", "POST", { email, password });
    if (result.success) {
        localStorage.setItem("jwtToken", result.data);
    }
    return result;
};

export const sendEmail = (email) => {
    return makeRequest(API_BASE_URL, "/forgot-password", "POST", { email });
};
