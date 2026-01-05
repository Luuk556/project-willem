import loginIcon from "../../images/user-interface.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../inputs/CustomInput.tsx";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      if (localStorage.getItem("token")) { navigate("/home") }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5184/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Login failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); // store only token
      navigate("/home");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      window.location.reload()
    }
  };

  return (
    <div className="login-container">
      <img src={loginIcon} alt="Login" className="login-icon" />
      <p>Sign in</p>
      <form onSubmit={handleLogin}>
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
        <br />
        <button type="submit">
          Login
        </button>
        <button><Link to={"/register"}>Register</Link></button>
      </form>
    </div>
  );
};

export default Login;
