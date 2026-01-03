import { makeRequest } from "../utils/makeRequest";
const API_BASE_URL = "http://localhost:8080/api/planner";

export const getPlanner = (token) => {
    return makeRequest(API_BASE_URL, "", "GET", null, token);
};

export const updatePlannerSettings = (plannerData, token) => {
    return makeRequest(API_BASE_URL, "", "PUT", plannerData, token);
};
