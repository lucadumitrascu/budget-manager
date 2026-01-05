import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/dashboard";

export const getDashboardData = (token) => {
    const period = localStorage.getItem("selectedPeriod");
    const url = period ? `${API_BASE_URL}/data?period=${period}` : `${API_BASE_URL}/data`;
    return makeRequest(url, "", "GET", null, token);
};