import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/fixed-transactions";

export const getFixedTransactions = (token) => {
    return makeRequest(API_BASE_URL, "", "GET", null, token);
};

export const addFixedTransaction = (newFixedTransaction, token) => {
    return makeRequest(API_BASE_URL, "", "POST", {
        title: newFixedTransaction.title,
        type: newFixedTransaction.type,
        amount: newFixedTransaction.amount,
        destinationId: newFixedTransaction.destinationId,
        frequency: newFixedTransaction.frequency,
        executionDay: newFixedTransaction.executionDay,
    }, token);
};

export const updateFixedTransaction = (updatedFixedTransaction, token) => {
    return makeRequest(API_BASE_URL, `/${updatedFixedTransaction.id}`, "PUT", {
        title: updatedFixedTransaction.title,
        type: updatedFixedTransaction.type,
        amount: updatedFixedTransaction.amount,
        destinationId: updatedFixedTransaction.destinationId,
        frequency: updatedFixedTransaction.frequency,
        executionDay: updatedFixedTransaction.executionDay,
    }, token);
};

export const deleteFixedTransaction = (id, token) => {
    return makeRequest(API_BASE_URL, `/${id}`, "DELETE", null, token);
};
