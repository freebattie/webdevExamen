import { EmployeeLinks } from "../Components/employeeLinks.jsx";
import { Dishes } from "./dishes.jsx";

export function LoggedInnEmployee(props) {
  return (
    <div>
      Name: {props.user.name} username: ({props.user.username}) role:(
      {props.user.role})
      <div>
        <div>
          <EmployeeLinks reload={props.reload} />
          <button className={"button"} onClick={(e) => navigate("/chat")}>
            chat
          </button>
          <Dishes setError={props.setError} />
        </div>
      </div>
    </div>
  );
}
