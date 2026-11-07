import axios from "axios";

// Nunca passar o objeto de erro do axios inteiro para o console: ele carrega
// config.headers (Authorization: Bearer <token>) e config.data (o body, que no
// login/cadastro tem a senha). Em release isso vai para o logcat do Android.
// Aqui só sai o que ajuda a debugar sem expor dado sensível.
export function logError(context: string, error: unknown) {
    if (axios.isAxiosError(error)) {
        console.log(context, {
            status: error.response?.status,
            code: error.code,
            method: error.config?.method,
            url: error.config?.url,
        });
        return;
    }

    console.log(context, error instanceof Error ? error.message : String(error));
}
