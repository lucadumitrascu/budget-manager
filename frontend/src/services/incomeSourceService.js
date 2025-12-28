import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/income-sources";

export const getIncomeSources = (token) => {
    return makeRequest(API_BASE_URL, "", "GET", null, token);
};

export const addIncomeSource = (name, token) => {
    return makeRequest(API_BASE_URL, "", "POST", { name }, token);
};

export const updateIncomeSource = (updatedIncomeSource, token) => {
    return makeRequest(API_BASE_URL, `/${updatedIncomeSource.id}`, "PUT", { name: updatedIncomeSource.name }, token);
};

export const deleteIncomeSource = (id, token) => {
    return makeRequest(API_BASE_URL, `/${id}`, "DELETE", null, token);
};
