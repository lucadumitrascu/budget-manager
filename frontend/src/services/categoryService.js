import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/categories";

export const getCategories = (token) => {
    return makeRequest(API_BASE_URL, "", "GET", null, token);
};

export const addCategory = (name, token) => {
    return makeRequest(API_BASE_URL, "", "POST", { name }, token);
};

export const updateCategory = (updatedCategory, token) => {
    return makeRequest(API_BASE_URL, `/${updatedCategory.id}`, "PUT", { name: updatedCategory.name }, token);
};

export const deleteCategory = (id, token) => {
    return makeRequest(API_BASE_URL, `/${id}`, "DELETE", null, token);
};
