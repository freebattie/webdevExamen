import { useNavigate } from "react-router-dom";

export function ErrorUser() {
  const navigate = useNavigate();
  return (
    <div>
      <div>user exsist</div>
      <button onClick={() => navigate("/register")}>back</button>
    </div>
  );
}
