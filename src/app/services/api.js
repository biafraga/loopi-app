import axios from "axios";

// ⚠️ ATENÇÃO: Troque "localhost" pelo IP da máquina na sua rede Wi-Fi!
const api = axios.create({
    baseURL:'http://localhost:8080',
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

export default api;

