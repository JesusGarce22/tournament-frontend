import axiosInstance, { setAuthToken } from "../config/axios";
export class AuthService {
    public async login(username: string, password: string) {
        try {
            const response = await axiosInstance.post('/user/signin', { username, password });
            const token = response.data.token;

            // Solo guardar el token en localStorage si estamos en el cliente
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token);
                setAuthToken(token); // Asigna el token a la instancia de axios
            }

            return response.data;
        } catch (error) {
            throw new Error('Login failed. Please check your credentials.'+ error);
        }
    }

    public async singup(username: string, password: string) {
        try {
            const response = await axiosInstance.post('/user/signup', { username, password });
            
            return response.data;
        } catch (error) {
            throw new Error('signup failed. Please check your credentials.'+ error);
        }
    }
}
