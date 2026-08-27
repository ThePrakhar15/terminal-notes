import { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h1>Login</h1>
            <form>
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
            </form>
        </div>
    )
}

export default Login;