import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/expenses";

export const getExpenses = (token) => {
    return makeRequest(API_BASE_URL, "", "GET", null, token);
};

export const addExpense = (newExpense, token) => {
    return makeRequest(API_BASE_URL, "", "POST", {
        amount: newExpense.amount,
        category: newExpense.category,
        description: newExpense.description,
    }, token);
};

export const updateExpense = (updatedExpense, token) => {
    return makeRequest(API_BASE_URL, `/${updatedExpense.id}`, "PUT", {
        amount: updatedExpense.amount,
        category: updatedExpense.category,
        description: updatedExpense.description,
    }, token);
};

export const deleteExpense = (id, token) => {
    return makeRequest(API_BASE_URL, `/${id}`, "DELETE", null, token);
};
