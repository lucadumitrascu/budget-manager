import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/goals";

export const getGoals = (token) => {
    return makeRequest(API_BASE_URL, "", "GET", null, token);
};

export const addGoal = (newGoal, token) => {
    return makeRequest(API_BASE_URL, "", "POST", {
        name: newGoal.name,
        targetAmount: newGoal.targetAmount,
    }, token);
};

export const updateGoal = (updatedGoal, token) => {
    return makeRequest(API_BASE_URL, `/${updatedGoal.id}`, "PUT", {
        name: updatedGoal.name,
        targetAmount: updatedGoal.targetAmount,
    }, token);
};

export const deleteGoal = (id, token) => {
    return makeRequest(API_BASE_URL, `/${id}`, "DELETE", null, token);
};

export const withdrawFundsFromGoal = (id, token) => {
    return makeRequest(API_BASE_URL, `/${id}/withdraw`, "PUT", null, token);
};
