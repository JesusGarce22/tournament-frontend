"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../config/axios";
import styles from "./editUser.module.css"; 
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    id: number;       
    username: string; 
}

export default function EditUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const currentUser = Cookies.get('currentUser');
        if (currentUser) {
            const userData = JSON.parse(currentUser);
            const currentUsername = userData.name; 
            axiosInstance.get<User[]>('/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then(response => {
                    const users = response.data;
                    const foundUser = users.find((user: User) => user.username.toLowerCase() === currentUsername.toLowerCase());
                    
                    if (foundUser) {
                        setUserId(foundUser.id);
                        setUsername(foundUser.username);
                    } else {
                        toast.error("User not found");
                    }
                })
                .catch(error => {
                    toast.error("Error fetching users: " + error.message);
                });
        } else {
            toast.error("User not found in cookies");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userId) {
            try {
                const updatedUser = { username, password };
                await axiosInstance.put(`/user/${userId}`, updatedUser, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                Cookies.set("currentUser", JSON.stringify({ name: username }));
                toast.success("User updated successfully");
                router.push("/");
            } catch (error) {
                toast.error("Error updating user: " + error);
            }
        } else {
            toast.error("User ID not found");
        }
    };

    return (
        <div className={styles.page}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <label className={styles.label}>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className={styles.inputField}
                    required
                />

                <label className={styles.label}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={styles.inputField}
                    required
                />

                <button type="submit" className={styles.button}>
                    Update User
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}
