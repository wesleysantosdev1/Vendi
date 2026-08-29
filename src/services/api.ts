import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.1.11:3000"
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
