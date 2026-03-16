import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      navigate("/list");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h2 className="title">Employee Dashboard</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;