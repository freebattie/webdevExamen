import * as React from "react";

import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../pages/login";

global.IS_REACT_ACT_ENVIRONMENT = true;

describe("login", () => {
  it("should render login", async function () {
    const element = document.createElement("div");
    const mockFetchPromise = jest.fn();

    //creat a React root from that id
    const root = createRoot(element);
    const setError = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Login setError={setError} />
        </MemoryRouter>
      );
    });
    await act(async () => {
      await Simulate.change(
        await element.querySelector("form:nth-of-type(1)  input"),
        {
          target: { value: "Petter petter" },
        }
      );
      await Simulate.change(await element.querySelector("form footer input"), {
        target: { value: "Petter petter" },
      });
    });
    await act(async () => {
      await Simulate.submit(await element.querySelector("form"));
    });
    await act(async () => {});

    expect(element).toMatchSnapshot();
  });
});
