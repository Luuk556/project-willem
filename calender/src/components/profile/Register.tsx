import loginIcon from "../../images/user-interface.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../inputs/CustomInput.tsx";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {navigate("/home")}
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5184/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, email, password }),
      });

      if (!res.ok) {
        const errText = await res.text();
        setError(errText || "Login failed");
      }

      if (res.ok) {
        setMessage("User created")
        navigate("/home")
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); // store only token
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <img src={loginIcon} alt="Login" className="login-icon" />
      <p>Create your account</p>
      <form onSubmit={handleRegister}>
        <CustomInput
          type="text"
          label="Name"
          defaultValue={name}
          onChange={setName}
        />
        <CustomInput
          type="text"
          label="Email"
          defaultValue={email}
          onChange={setEmail}
        />
        <CustomInput
          type="password"
          label="password"
          defaultValue={password}
          onChange={setPassword}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <br />
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
