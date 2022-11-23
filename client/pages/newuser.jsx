import { useContext, useState } from "react";
import { Appcontext } from "../lib/appcontext.jsx";
import { useNavigate } from "react-router-dom";

export function NewUser({ setError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const { createUser } = useContext(Appcontext);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
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
            <label>
              <strong>name: </strong>
              <input
                className={"input"}
                id={name}
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <strong>username: </strong>
              <input
                className={"input"}
                type={"text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <strong>password: </strong>
              <input
                className={"input"}
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </div>
        <button className={"button"}>Save</button>
      </form>
      <button className={"button"} onClick={(e) => navigate("/")}>
        back
      </button>
    </div>
  );
}
