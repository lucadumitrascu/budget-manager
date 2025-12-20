export const makeRequest = async (baseUrl, endpoint, method = "POST", body = null, token = null) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${baseUrl}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

        const responseData = await response.json();

        if (response.status === 200 || response.status === 201) {
            return {
                success: true, message: responseData.message,
                data: responseData.data, status: response.status
            };
        } else {
            return { success: false, message: responseData.message || "Something went wrong." };
        }
    } catch (error) {
        return { success: false, message: "Something went wrong. " + error.message };
    }
};