import { Link } from "react-router-dom";

import { Dishes } from "./dishes.jsx";
import { LogOut } from "../Components/logout.jsx";
import { LoggedInnLinks } from "../Components/loggedinnlinks";
import { LogOutMain } from "../Components/logoutMain";

export function LoggedInnUsers(props) {
  return (
    <div>
      Name: {props.user.name} username: ({props.user.username}) role:(
      {props.user.role})
      <div>
        <div>
          <LoggedInnLinks reload={props.reload} />
          <button className={"button"} onClick={(e) => navigate("/chat")}>
            chat
          </button>
          <Dishes setError={props.setError} />
        </div>
      </div>
    </div>
  );
}
