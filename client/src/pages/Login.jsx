import { useState } from "react";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.trim() === "") {
            setError("Email is required");
            return;
        }
        if (password.trim() === "") {
            setError("Password is required");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }
        if (!email.includes("@")) {
            setError("please enter a valid email");
            return;
        }
        setError("");
        

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });
console.log(response.data.message);
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <p>{error}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Enter your email"
                    value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Enter your password"
                    value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;