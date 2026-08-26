
function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Enter your email" />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="enter your password"/>
            </form>
        </div>
    )
}

export default Login;