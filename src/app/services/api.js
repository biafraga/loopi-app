import axios from "axios";

// ATENÇÃO: Troque "localhost" pelo IP da máquina na sua rede Wi-Fi!
export const api = axios.create ({
    baseURL:'http://127.0.0.1:8080',
    timeout: 8000,
    headers: {'Content-Type': 'application/json'},
})

api.interceptors.request.use(config => {
    console.log(`[AXIOS]  ${config.method.toUpperCase()} ${config.url}`)
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        console.warn('[AXIOS] Erro: ', error.response?.status, error.message);
        return Promise.reject(error);
    }
);

export async function request(method, path, body = null) {
    try {
        const response = await api({
            method: method,
            url: path,
            data: body
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const api_metodos = {
    get: (path) => request('GET', path),
    post: (path, body) => request('POST', path, body),
    put: (path, body) => request('PUT', path, body),
    delete: (path) => request('DELETE', path),
};
