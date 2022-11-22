import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "./logout.jsx";

export function LoggedInnLinks(props) {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <LogOut reload={props.reload} />
      </div>
      <div>
        <Link className={"button"} to={"/myorders"}>
          show orders
        </Link>
      </div>
    </div>
  );
}
