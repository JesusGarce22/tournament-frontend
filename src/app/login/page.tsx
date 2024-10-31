"use client";

import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./loginPage.module.css";
import { useCreateUser } from "@/hooks/auth/users/useCreateUser";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const router = useRouter();
    const { login: loginFunction } = useLogin();
    const { singup: registerFunction } = useCreateUser(); // Corregido a "signup"

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    const onSubmit = async () => {
        if (login && password) {
            try {
                const res = await loginFunction(login, password);
                console.log(res);
                router.push("/home");
            } catch (err) {
                alert("Invalid login or password");
                setLogin("");
                setPassword("");
                console.log(err);
            }
        } else {
            alert("Please fill all fields");
        }
    };

    const onRegisterSubmit = async () => {
        if (name && registerPassword) {
            try {
                const res = await registerFunction(name, registerPassword);
                console.log(res);
                router.push("/login");
            } catch (err) {
                alert("Invalid data");
                setName(""); // Asegúrate de limpiar el campo de nombre también
                setRegisterPassword("");
                console.log(err);
            }
        } else {
            alert("Please fill all fields");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.formContainer}>
                
                {isRegister ? (
                    <>
                        <label className="mt-4">Username</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.inputField}
                        />

                        <label className="mt-4">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            className={styles.inputField}
                        />

                        <button
                            onClick={onRegisterSubmit}
                            className={styles.button}
                        >
                            Register
                        </button>
                        <p className={styles.message}>
                            Already registered?{" "}
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }} className="text-blue-500 underline">
                                Sign In
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <label className="mt-4">Username</label>
                        <input
                            type="text"
                            placeholder="Login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className={styles.inputField}
                        />

                        <label className="mt-4">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.inputField}
                        />

                        <button
                            onClick={onSubmit}
                            className={styles.button}
                        >
                            Login
                        </button>
                        <p className={styles.message}>
                            Not registered?{" "}
                            <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }} className="text-blue-500 underline">
                                Create an account
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
