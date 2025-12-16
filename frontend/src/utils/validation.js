import { MAX_NUMBER_LIMIT, MIN_NUMBER_LIMIT } from "./constants";

export const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) return "Passwords must be the same.";
    return null;
};

export const validatePasswordLength = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long.";
    return null;
};

export const validateEmail = (email) => {
    if (!email.includes("@")) return "Invalid email format.";
    return null;
};

const isWithinNumericLimits = (num) => {
    if (isNaN(num) || num > MAX_NUMBER_LIMIT || num < MIN_NUMBER_LIMIT) {
        return false;
    }
    return true;
};

export const validateNumericField = (value, label) => {
    if (isNaN(value)) return `${label} must be a valid number.`;
    if (value <= 0) return `${label} must be greater than 0.`;
    if (!isWithinNumericLimits(value)) return `${label} exceeds allowed limit.`;
    return null;
};

