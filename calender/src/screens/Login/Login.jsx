import loginIcon from "../../images/user-interface.png"
function Login() {
    return (
        <div className="background-login">
            <div className="login-container">
                <img src={loginIcon} alt="" className="login-icon" />
                <p>Sign in</p>
                <input type="text" placeholder="Username" className="login-input" />
                <br />
                <input type="text" placeholder="Password" className="login-input" />
                <br />
                <br />
                <button className="login-button">Login</button>
                <br />
                <p className="login-register">Don't have an account? <button className="login-register-button">Register here</button></p>
            </div>
        </div>
    );
}


export default Login
