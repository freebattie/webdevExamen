import { useNavigate } from "react-router-dom";

export function LogOutMain(props) {
  const navigate = useNavigate();
  return (
    <button
      className={"button"}
      onClick={async () => {
        await fetch("/api/login", {
          method: "delete",
        });
        props.reload();
        navigate("/");
      }}
    >
      Logout
    </button>
  );
}
