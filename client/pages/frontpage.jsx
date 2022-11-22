import { useLoader } from "../lib/useLoading.jsx";
import { fetchJSON } from "../lib/http.js";

import { LoggedInnUsers } from "./loggedinnusers.jsx";
import { NotLoggedInnUsers } from "./notloggedinn.jsx";
import { ErrorMsg } from "./errormsg.jsx";
import { LoggedInnEmployee } from "./loggedinnemployee.jsx";

export function FrontPage({ setError }) {
  const { loading, error, data, reload } = useLoader(
    async () => await fetchJSON("/api/login")
  );
  const user = data;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMsg error={error} />;
  }

  return (
    <div>
      <h1>Modern Snack</h1>
      {user ? (
        user.role === "user" ? (
          <LoggedInnUsers user={user} reload={reload} setError={setError} />
        ) : (
          <LoggedInnEmployee user={user} reload={reload} setError={setError} />
        )
      ) : (
        <NotLoggedInnUsers setError={setError} />
      )}
    </div>
  );
}
