import * as React from "react";

import { createRoot } from "react-dom/client";

import { act } from "react-dom/test-utils";

import { MemoryRouter } from "react-router-dom";

global.IS_REACT_ACT_ENVIRONMENT = true;
import { Simulate } from "react-dom/test-utils";
import { FrontPage } from "../pages/frontpage";
import { NotLoggedInnUsers } from "../pages/notloggedinn";
import { LoggedInnUsers } from "../pages/loggedinnusers";
const user = {
  name: "testuser",
  username: "test",
  password: "testpass",
};
describe("users", function () {
  it("should render logged inn page", function () {
    const element = document.createElement("div");

    //creat a React root from that id

    act(() => {
      const root = createRoot(element);

      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <LoggedInnUsers user={user} />
        </MemoryRouter>
      );
    });

    expect(element).toMatchSnapshot();
  });
  it("user not logged inn", function () {
    const element = document.createElement("div");

    //creat a React root from that id

    act(() => {
      const root = createRoot(element);

      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <NotLoggedInnUsers />
        </MemoryRouter>
      );
    });

    expect(element).toMatchSnapshot();
  });
});
