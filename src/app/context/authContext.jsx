import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from "react";
import { cadastrarUsuario, loginUsuario } from "../services/authService";

export const API_URL = '192.168.1.17'; // Coloque o IP!
let tokenJWT = null; // O token em memória
const TIMEOUT_MS = 10_000; 

// Funções globais para manipular o Token
export function setToken(token) {
    tokenJWT = token;
}

export function clearToken() {
    tokenJWT = null;
}

// Guarda o contexto de requisições que começa vazio
export const AuthContext = createContext(null); 

// O Provedor que vai abraçar o aplicativo
export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    // Função de Login Global
    const login = async (email, password) => {
        try {
            // Chama a API
            const response = await loginUsuario({ email, password });
            
            // Guarda o Token no "cofre" do celular e na memória (assumindo que o back retorne algo como response.token)
            if (response.token) {
                setToken(response.token);
                await AsyncStorage.setItem('@loopi_token', response.token);
            }

            // Salva os dados do usuário para o app saber quem está logado
            setUsuario(response.usuario || response); 
            return response;
            
        } catch (error) {
            console.error("Erro no AuthContext (Login):", error);
            throw error;
        }
    };

    // Função de Cadastro Global
    const register = async (name, email, password) => {
        try {
            const response = await cadastrarUsuario({ nome: name, email: email, senha: password });
            return response;
        } catch (error) {
            console.error("Erro no AuthContext (Cadastro):", error);
            throw error;
        }
    };

    // Função de Logout (Sair da conta)
    const logout = async () => {
        try {
            clearToken();
            await AsyncStorage.removeItem('@loopi_token');
            setUsuario(null);
        } catch (error) {
            console.error("Erro ao sair da conta:", error);
        }
    };

    // Disponibiliza as variáveis e funções para todas as telas
    return (
        <AuthContext.Provider value={{ usuario, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}