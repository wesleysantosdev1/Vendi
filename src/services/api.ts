import axios from "axios";

export const api = axios.create({
    baseURL: "https://vendi-api-wq52.onrender.com",
    // Render free "dorme" sem uso e a primeira requisição pode levar ~50s.
    timeout: 60000
});

export function setAuthToken(token: string | null) {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
    onUnauthorized = handler;
}

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const hasActiveSession = Boolean(api.defaults.headers.common["Authorization"]);

        if (error.response?.status === 401 && hasActiveSession && onUnauthorized) {
            onUnauthorized();
        }

        return Promise.reject(error);
    }
);
