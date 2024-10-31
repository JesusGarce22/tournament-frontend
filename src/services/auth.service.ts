import axios, { AxiosInstance } from 'axios';

export class AuthService {
    protected readonly axios: AxiosInstance;
    private readonly TOKEN_KEY = 'auth_token'; // Clave para el almacenamiento en localStorage

    constructor(url: string) {
        this.axios = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 3000,
            timeoutErrorMessage: 'Request Timeout'
        });

        // Si el token ya está en localStorage, configúralo
        const token = this.getToken();
        if (token) {
            this.setAuthHeader(token);
        }

        // Interceptor para manejar respuestas con errores de autenticación
        this.axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    // Si es un error 401, limpiar el token y redirigir si es necesario
                    this.logout();
                    alert("Session expired. Please log in again.");
                }
                return Promise.reject(error);
            }
        );
    }

    // Método de inicio de sesión
    public async login(username: string, password: string) {
        try {
            const response = await this.axios.post('/user/signin', { username, password });
            const token = response.data.token; // Asumiendo que el token viene en response.data.token
            this.setToken(token);
            this.setAuthHeader(token);
            return response.data;
        } catch (error) {
            throw new Error('Login failed. Please check your credentials.');
        }
    }

    public async singup(username: string, password: string) {
        try {
            const response = await this.axios.post('/user/signup', { username, password });
            
            return response.data;
        } catch (error) {
            throw new Error('signup failed. Please check your credentials.');
        }
    }

    // Configura el encabezado de autorización con el token
    private setAuthHeader(token: string) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Almacena el token en localStorage
    private setToken(token: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    // Obtiene el token de localStorage
    public getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // Elimina el token de localStorage y de las cabeceras
    public logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        delete this.axios.defaults.headers.common['Authorization'];
    }
}
