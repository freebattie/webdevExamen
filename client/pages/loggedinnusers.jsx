import { Link } from "react-router-dom";

import { Dishes } from "./dishes.jsx";
import { LogOut } from "../Components/logout.jsx";
import { LoggedInnLinks } from "../Components/loggedinnlinks";

export function LoggedInnUsers(props) {
  return (
    <div>
      Name: {props.user.name} username: ({props.user.username}) role:(
      {props.user.role})
      <LogOut reload={props.reload} />
      <div>
        <div>
          <LoggedInnLinks reload={props.reload} />
          <Dishes setError={props.setError} />
        </div>
      </div>
    </div>
  );
}
