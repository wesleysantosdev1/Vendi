import { api } from "./api";

export async function loginRequest(email: string, password: string) {
    const response = await api.post("/auth/login", {
        email,
        password
    });

    return response.data;
}

export async function registerRequest(name: string, email: string, password: string) {
    const response = await api.post("/auth/register", {
        name,
        email,
        password
    });

    return response.data;
}