import { useLoader } from "../lib/useLoading.jsx";
import { fetchJSON } from "../lib/http.js";
import { Link } from "react-router-dom";
import { LoginLinks } from "../Components/loginlinks.jsx";
import { useState } from "react";
import { Dishes } from "./menu.jsx";
import { LoggedInnUsers } from "./loggedinnusers.jsx";
import { NotLoggedInnUsers } from "./notloggedinn.jsx";

export function FrontPage() {
  const { loading, error, data, reload } = useLoader(
    async () => await fetchJSON("/api/login")
  );
  const user = data;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div style={{ border: "1px solid red", background: "Pink" }}>
        An error occurred: {error.toString()}
      </div>
    );
  }

  return (
    <div>
      <h1>Modern Snack</h1>
      {user ? (
        <LoggedInnUsers user={user} reload={reload} />
      ) : (
        <NotLoggedInnUsers />
      )}
    </div>
  );
}
