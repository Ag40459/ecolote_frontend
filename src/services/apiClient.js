import axios from "axios";

// Define a URL base da API com base na variável de ambiente VITE_API_BASE_URL
// Para desenvolvimento, você pode criar um arquivo .env na raiz do projeto frontend com:
// VITE_API_BASE_URL=http://localhost:3001/api
// Para produção, esta variável será configurada no ambiente de deploy (ex: Netlify, Vercel, Render)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

// Cria uma instância do axios com a URL base configurada
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Função para adicionar o token JWT aos headers das requisições.
 * O token deve ser obtido do localStorage ou de um estado global (Context, Redux, Zustand).
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminAuthToken"); // Exemplo de como obter o token
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;

// Você pode também exportar a URL base se precisar dela em algum outro lugar
export { API_BASE_URL };

