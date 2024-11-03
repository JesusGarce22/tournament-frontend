import axiosInstance from "../config/axios";
export class AuthService {
    public async login(username: string, password: string) {
        try {
            const response = await axiosInstance.post('/user/signin', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            return response.data;
        } catch (error) {
            throw new Error('Login failed. Please check your credentials.');
        }
    }

    public async singup(username: string, password: string) {
        try {
            const response = await axiosInstance.post('/user/signup', { username, password });
            
            return response.data;
        } catch (error) {
            throw new Error('signup failed. Please check your credentials.');
        }
    }
}
