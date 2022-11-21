import { useContext, useState } from "react";
import { Appcontext } from "../lib/appcontext.jsx";
import { useNavigate } from "react-router-dom";

export function NewUser({ setError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const { createUser } = useContext(Appcontext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(false);
      await createUser({ name, username, password });
      navigate("/");
    } catch (e) {
      setError(e);
      navigate("/errorUser");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            name:{" "}
            <input
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            username:{" "}
            <input
              type={"text"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            password:{" "}
            <input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button>Save</button>
      </form>
    </div>
  );
}
