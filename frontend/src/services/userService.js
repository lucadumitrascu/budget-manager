import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/users";

export const getUserData = (token) => {
    return makeRequest(API_BASE_URL, "/me", "GET", null, token);
};

export const saveUsername = (username, token) => {
    return makeRequest(API_BASE_URL, "/me/username", "PUT", { username }, token);
};
