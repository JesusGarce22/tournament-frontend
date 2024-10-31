import { User } from "@/interfaces/user";
import { AuthService } from "@/services/auth.service";
import Cookies from "js-cookie";

export const useCreateUser = () => {
    const singup = async (username: string, password: string) => {
        const authService = new AuthService("http://localhost:3001");
        
        const user = await authService.singup(username, password);
        if (user)
            Cookies.set("currentUser", JSON.stringify(user));

        return user as User;        
    }

    return {singup};
};