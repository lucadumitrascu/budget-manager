import { useState, useEffect } from "react";

const useError = () => {
    const [error, setError] = useState("");

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 10000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return [error, setError];
};

export default useError;
