import { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if( email === ""){
            setError("Email is required");
            return;
        }
        if( password ===  ""){
            setError("Password is required");
        return;
    }
            setError("");
            console.log(email,password);
    }

    return (
        <div>
            <h1>Login</h1>
            <p>{error}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Enter your email"
                value={email} onChange={(e) =>{
                    setEmail(e.target.value)
                }} />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Enter your password" 
                value={password} onChange={ (e) =>{
                    setPassword(e.target.value)
                }}/>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;