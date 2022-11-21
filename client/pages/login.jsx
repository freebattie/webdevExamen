import { useContext, useState } from "react";
import { Appcontext } from "../lib/appcontext.jsx";
import { useNavigate } from "react-router-dom";

export function Login({ setError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logInUser } = useContext(Appcontext);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await logInUser({ username, password });
      navigate("/");
    } catch (e) {
      setError(e);
      navigate("/error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Please log in</h1>
      <div>
        Username:{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Log in</button>
      </div>
      <pre>{JSON.stringify({ username, password }, undefined, "  ")}</pre>
    </form>
  );
}
