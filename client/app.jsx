import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FrontPage } from "./pages/frontpage.jsx";
import { EditUsers } from "./pages/edituser.jsx";
import { ErrorUser } from "./pages/erroruser.jsx";
import { Login } from "./pages/login.jsx";
import { NewUser } from "./pages/newuser.jsx";

import { useEffect, useState } from "react";
import { MyOrders } from "./pages/myorders.jsx";
import { Error } from "./pages/error.jsx";
import { EditMenu } from "./pages/editmenu.jsx";

import { MenuItemAdd } from "./pages/menuitemadd";
import { ChatApplication } from "./pages/chatApp.jsx";
import { Chat } from "./pages/chat";

function AddMenu({ setError }) {
  return (
    <div>
      <MenuItemAdd setError={setError} />
    </div>
  );
}

export function App() {
  const [error, setError] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage setError={setError} />} />
        <Route path={"/login"} element={<Login setError={setError} />} />
        <Route path={"/register"} element={<NewUser setError={setError} />} />
        <Route path={"/edit"} element={<EditUsers />} />
        <Route path={"/error"} element={<Error error={error} />} />
        <Route path={"/errorUser"} element={<ErrorUser />} />
        <Route path={"/Myorders"} element={<MyOrders />} />
        <Route path={"/editmenu"} element={<EditMenu setError={setError} />} />
        <Route path={"/addmenu"} element={<AddMenu setError={setError} />} />
        <Route path={"/chat"} element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
