import { Link } from "react-router-dom";

export function Loggedoutlinks() {
  return (
    <div>
      <div>
        <Link className={"button"} to={"/login"}>
          Login
        </Link>
      </div>
      <div>
        <Link className={"button"} to={"/register"}>
          Register new user
        </Link>
      </div>
    </div>
  );
}
