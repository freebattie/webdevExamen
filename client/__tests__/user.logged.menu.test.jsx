import * as React from "react";

import { createRoot } from "react-dom/client";

import { act } from "react-dom/test-utils";

import { MemoryRouter } from "react-router-dom";

global.IS_REACT_ACT_ENVIRONMENT = true;
import { Simulate } from "react-dom/test-utils";

import { NotLoggedInnUsers } from "../pages/notloggedinn";
import { LoggedInnUsers } from "../pages/loggedinnusers";
const user = {
  name: "testuser",
  username: "test",
  password: "testpass",
};
describe("users", function () {
  it("should render logged inn page", async function () {
    const element = document.createElement("div");

    //creat a React root from that id

    await act(async () => {
      const root = createRoot(element);
      const reload = jest.fn();
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <LoggedInnUsers user={user} reload={reload} />
        </MemoryRouter>
      );
    });
    const mockFetchPromise = jest.fn();

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    await act(async () => {
      await Simulate.click(element.querySelector("button"));
    });

    expect(element).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;
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
