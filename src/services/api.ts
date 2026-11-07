import axios from "axios";

// URL do back por ambiente. Vem da variável EXPO_PUBLIC_API_URL, que o Expo
// embute no bundle na hora do build/update:
// - builds e updates do EAS: variáveis do ambiente (preview/production) no painel
//   do EAS (`eas env:list`). Sempre publicar update com `--environment <canal>`.
// - dev local (Metro): arquivo .env.local na raiz (fora do git), ex.:
//   EXPO_PUBLIC_API_URL=http://192.168.1.104:3000
// Não é segredo (vai dentro do app), mas também não tem fallback hardcoded: se
// faltar, é erro de configuração e precisa aparecer, não apontar pro lugar errado.
const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
    console.error("EXPO_PUBLIC_API_URL não definida — configure o ambiente do EAS ou o .env.local");
}

export const api = axios.create({
    baseURL: API_URL,
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
