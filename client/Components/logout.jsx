import { useNavigate } from "react-router-dom";

export function LogOut(props) {
  const navigate = useNavigate();
  return (
    <button
      className={"button"}
      onClick={async () => {
        await fetch("/api/login", {
          method: "delete",
        });
        navigate("/");
      }}
    >
      Logout
    </button>
  );
}
