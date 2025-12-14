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
