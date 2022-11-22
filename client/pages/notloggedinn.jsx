import { Dishes } from "./dishes.jsx";
import { Loggedoutlinks } from "../Components/loggedoutlinks.jsx";

export function NotLoggedInnUsers({ setError }) {
  return (
    <div>
      <Loggedoutlinks />
      <Dishes setError={setError} />
    </div>
  );
}
