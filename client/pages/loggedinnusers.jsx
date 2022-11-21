import { Link } from "react-router-dom";

export function LoggedInnUsers(props) {
  return (
    <div>
      Name: {props.user.name} username: ({props.user.username}) role:(
      {props.user.role})
      <button
        onClick={async () => {
          await fetch("/api/login", {
            method: "delete",
          });
          reload();
        }}
      >
        Logout
      </button>
      <div>
        <Link to={"/edit"}>edit users</Link>
      </div>
    </div>
  );
}
