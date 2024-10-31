import { User } from "@/interfaces/user";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const user = Cookies.get("currentUser");
        if (user) {
            setUser(JSON.parse(user));
        }
    },[]);
    return {user};
}