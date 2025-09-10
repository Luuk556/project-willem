import "./Login.css"
function Login() {
    return (
        <div className="container">
            <p>Sign in</p>
            <input type="text" placeholder="Username" className="login-input" />
            <br/>
            <input type="text" placeholder="Password" className="login-input" />
            <br/>
            <br/>
            <button className="login-button">Login</button>
        </div>
    );
}


export default Login
