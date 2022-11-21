import * as React from "react";

import { createRoot } from "react-dom/client";

import { NewUser } from "../pages/newuser";

import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { Appcontext } from "../lib/appcontext";
global.IS_REACT_ACT_ENVIRONMENT = true;
describe("add user", () => {
  it("shows form", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);
    await act(() => {
      root.render(
        <MemoryRouter>
          <NewUser />
        </MemoryRouter>
      );
    });
    expect(element.innerHTML).toMatchSnapshot();

    const inputLabels = Array.from(
      element.querySelectorAll("form div div label strong")
    ).map((label) => label.innerHTML);
    expect(inputLabels).toEqual(["name: ", "username: ", "password: "]);
  });
  it("submits form", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);
    const createUser = jest.fn();
    const setError = jest.fn();
    await act(async () =>
      root.render(
        <MemoryRouter>
          <Appcontext.Provider value={createUser}>
            <NewUser setError={setError} />
          </Appcontext.Provider>
        </MemoryRouter>
      )
    );

    await act(async () => {
      await Simulate.change(
        await element.querySelector("form div:nth-child(1) input"),
        {
          target: { value: "Petter petter" },
        }
      );
      await Simulate.change(
        await element.querySelector("form div:nth-child(2) input"),
        {
          target: { value: "test" },
        }
      );
      await Simulate.change(
        await element.querySelector("form div:nth-child(3) input"),
        {
          target: { value: "1234" },
        }
      );
    });
    await act(async () => {
      await Simulate.submit(await element.querySelector("form"));
    });
  });
});
