import * as React from "react";

import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../pages/login";

global.IS_REACT_ACT_ENVIRONMENT = true;

describe("login", () => {
  it("should render login", async function () {
    const element = document.createElement("div");
    const mockFetchPromise = jest.fn();

    //creat a React root from that id
    const root = createRoot(element);
    const fn = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Login />
        </MemoryRouter>
      );
    });

    await act(async () => {});

    expect(element).toMatchSnapshot();
  });
});
