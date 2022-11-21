import { LoginLinks } from "../Components/loginlinks.jsx";
import { Dishes } from "./menu.jsx";

export function NotLoggedInnUsers() {
  return (
    <div>
      <LoginLinks />
      <Dishes />
    </div>
  );
}
