export const makeRequest = async (baseUrl, endpoint, method = "POST", body = null) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : null
        });

        const responseData = await response.json();

        if (response.status === 200 || response.status === 201) {
            return { success: true, message: responseData.message, data: responseData.data };
        } else {
            return { success: false, message: responseData.message || "Something went wrong." };
        }
    } catch (error) {
        return { success: false, message: "Something went wrong. " + error.message };
    }
};