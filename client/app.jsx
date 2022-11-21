import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { FrontPage } from "./pages/frontpage.jsx";
import { EditUsers } from "./pages/edituser.jsx";
import { ErrorUser } from "./pages/erroruser.jsx";
import { Login } from "./pages/login.jsx";
import { NewUser } from "./pages/newuser.jsx";
import "./app.css";
function Error(props) {
  return (
    <div style={{ border: "1px solid red", background: "Pink" }}>
      An error occurred: {props.error.toString()}
    </div>
  );
}

export function App() {
  const [error, setError] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<Login setError={setError} />} />
        <Route path={"/register"} element={<NewUser setError={setError} />} />
        <Route path={"/edit"} element={<EditUsers />} />
        <Route path={"/error"} element={<Error error={error} />} />
        <Route path={"/errorUser"} element={<ErrorUser />} />
      </Routes>
    </BrowserRouter>
  );
}
