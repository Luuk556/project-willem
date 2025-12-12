import { useState } from "react"
import { RegisterDto } from "../../data/datatypes/userDataTypes"
import {
  Navigate,
  useNavigate,
} from "react-router-dom";


const Register: React.FC = () => {
    const [userData, setUserData] = useState<RegisterDto>()
    const [loggedIn, logIn] = useState(false)
    const navigate = useNavigate()

    const useEffect = async (e: React.FormEvent) => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/home")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div>
            <div className="register-container">Register an account</div>
        </div>
    )
}

export default Register