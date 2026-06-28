import { api } from './api';

export async function loginUsuario(email, senha) {
    return api.post('/api/usuarios/login', { email, senha });
}

export async function cadastrarUsuario(nome, email, senha) {
    return api.post('/api/usuarios', { nome, email, senha });
}