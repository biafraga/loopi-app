import { createContext, useState } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

// Cria o Provedor do Contexto (Quem vai abraçar o aplicativo)
export const AuthProvider = ({ children }) => {
    // se user for 'null', a pessoa não está logada.
    const [user, setUser] = useState(null); 

    // Função de Login Global
    const login = async (email, password) => {
        try {
            // Chama o authService
            const data = await authService.login(email, password);
            
            // Salva os dados do usuário logado para o app inteiro saber quem ele é
            setUser(data); 
            
            return data;
        } catch (error) {
            console.error("Erro no AuthContext (Login):", error);
            throw error;
        }
    };

    // Função de Cadastro Global
    const register = async (name, email, password) => {
        try {
            const data = await authService.register(name, email, password);
            return data;
        } catch (error) {
            console.error("Erro no AuthContext (Cadastro):", error);
            throw error;
        }
    };

    // Função de Logout (Sair da conta)
    const logout = () => {
        setUser(null); // Apaga os dados do usuário, voltando ao estado deslogado
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};