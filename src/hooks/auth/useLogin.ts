import { User } from "@/interfaces/user";
import { AuthService } from "@/services/auth.service";
import Cookies from "js-cookie";

export const useLogin = () => {
    const login = async (username: string, password: string) => {
        const authService = new AuthService();
        const user = await authService.login(username, password);
        if (user)
            Cookies.set("currentUser", JSON.stringify(user));

        return user as User;        
    }

    return {login};
};