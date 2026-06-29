import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { clearToken, setToken } from "../services/tokenStore";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    // Restaura sessão salva ao abrir o app
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const token = await AsyncStorage.getItem('@loopi_token');
                const userData = await AsyncStorage.getItem('@loopi_usuario');
                if (token && userData) {
                    setToken(token);
                    setUsuario(JSON.parse(userData));
                }
            } catch (e) {
                console.warn('Erro ao restaurar sessão:', e);
            }
        };
        restoreSession();
    }, []);

    const login = async (email, password) => {
        const response = await authService.login(email, password);

        if (response.token) {
            setToken(response.token);
            await AsyncStorage.setItem('@loopi_token', response.token);
            await AsyncStorage.setItem('@loopi_usuario', JSON.stringify(response));
        }

        setUsuario(response);
        return response;
    };

    const register = async (nome, email, password) => {
        const response = await authService.register(nome, email, password);
        return response;
    };

    const logout = async () => {
        clearToken();
        await AsyncStorage.multiRemove(['@loopi_token', '@loopi_usuario']);
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
