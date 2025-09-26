import ExamplePopup from "../../components/popup/examplePopup.tsx";
import ExamplePopup2 from "../../components/popup/examplePopup2.tsx";
import PopupComponent from "../../components/popup/popup.tsx";
import loginIcon from "../../images/user-interface.png"
import { useState } from 'react';
function Login() {
    const [openPopup, setOpenPopup] = useState(false)
    const [openSecondPopup, setOpenSecondPopup] = useState(false)
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
            <button
                onClick={() => setOpenPopup(true)}
            >
                open example popup
            </button>
            <button
                onClick={() => setOpenSecondPopup(true)}
            >
                open second example popup
            </button>
            <PopupComponent
                closePopup={() => setOpenPopup(false)}
                isOpen={openPopup}>
                <ExamplePopup />
            </PopupComponent>
            <PopupComponent
                closePopup={() => setOpenSecondPopup(false)}
                isOpen={openSecondPopup}>
                <ExamplePopup2 id={1} />
            </PopupComponent>
        </div>
    );
}


export default Login
