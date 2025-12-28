import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/incomes";

export const getIncomes = (token) => {
    return makeRequest(API_BASE_URL, "", "GET", null, token);
};

export const addIncome = (newIncome, token) => {
    return makeRequest(API_BASE_URL, "", "POST", {
        amount: newIncome.amount,
        incomeSource: newIncome.incomeSource,
    }, token);
};

export const updateIncome = (updatedIncome, token) => {
    return makeRequest(API_BASE_URL, `/${updatedIncome.id}`, "PUT", {
        amount: updatedIncome.amount,
        incomeSource: updatedIncome.incomeSource,
    }, token);
};

export const deleteIncome = (id, token) => {
    return makeRequest(API_BASE_URL, `/${id}`, "DELETE", null, token);
};
