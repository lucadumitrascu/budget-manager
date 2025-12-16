import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/financial-info";

export const saveFinancialInfo = (salary, salaryDay, budget, currency, token) => {
    return makeRequest(API_BASE_URL, "/me", "PUT", { salary, salaryDay, budget, currency }, token);
};