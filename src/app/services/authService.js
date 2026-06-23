import api from './api';

const authService = {
    // LOGIN
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { 
                email: email, 
                password: password 
            });
            
            // Retorna os dados que o Spring Boot devolve (ex: token JWT, nome do usuário)
            return response.data; 
            
        } catch (error) {
            // caso o java retorne algum erro
            console.error("Erro no serviço de login:", error);
            throw error; 
        }
    },

    // CADASTRO
    register: async (name, email, password) => {
        try {
            const response = await api.post('/users/register', {
                name: name,
                email: email,
                password: password
            });
            
            return response.data;
            
        } catch (error) {
            console.error("Erro no serviço de cadastro:", error);
            throw error;
        }
    }
};

export default authService;