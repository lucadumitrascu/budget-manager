import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/savings";

export const getSavings = (token) => {
    return makeRequest(API_BASE_URL, "", "GET", null, token);
};

export const addSaving = (newSaving, token) => {
    return makeRequest(API_BASE_URL, "", "POST", {
        amount: newSaving.amount,
        goal: newSaving.goal,
    }, token);
};

export const updateSaving = (updatedSaving, token) => {
    return makeRequest(API_BASE_URL, `/${updatedSaving.id}`, "PUT", {
        amount: updatedSaving.amount,
        goal: updatedSaving.goal,
    }, token);
};

export const deleteSaving = (id, token) => {
    return makeRequest(API_BASE_URL, `/${id}`, "DELETE", null, token);
};
