import axios from "axios";

// ATENÇÃO: Troque "localhost" pelo IP da máquina na sua rede Wi-Fi!
const api = axios.create({
    baseURL:'192.168.1.17',
    timeout: 8000,
    headers: {'Content-Type': 'application/json'},
})

api.interceptors.request.use( config => {
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
        return response.data; // Retorna só os dados limpos do backend
    } catch (error) {
        throw error;
    }
}

// Constante responsável por montar os métodos disponíveis na API
export const api_metodos = {
    get: (path) => request('GET', path), 
    post: (path, body) => request('POST', path, body),
    put: (path, body) => request('PUT', path, body),
    delete: (path) => request('DELETE', path),
};

