import { Dishes } from "./dishes.jsx";
import { Loggedoutlinks } from "../Components/loggedoutlinks.jsx";

export function NotLoggedInnUsers({ setError }) {
  return (
    <div>
      <Loggedoutlinks />
      <button className={"button"} onClick={(e) => navigate("/chat")}>
        chat
      </button>
      <Dishes setError={setError} />
    </div>
  );
}
