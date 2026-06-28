import { createContext, useState } from 'react';
import { api } from '../services/api';
import { cadastrarUsuario, loginUsuario } from '../services/authService';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    async function login(email, senha) {
        const response = await loginUsuario(email, senha);
        const { token, id, nome, email: userEmail } = response.data;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUsuario({ id, nome, email: userEmail, token });
    }

    async function register(nome, email, senha) {
        await cadastrarUsuario(nome, email, senha);
    }

    function logout() {
        setUsuario(null);
        api.defaults.headers.common['Authorization'] = '';
    }

    return (
        <AuthContext.Provider value={{ usuario, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}