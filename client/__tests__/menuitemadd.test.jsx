import * as React from "react";

import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";

import { MenuItemAdd } from "../pages/menuitemadd";
import { MemoryRouter } from "react-router-dom";
global.IS_REACT_ACT_ENVIRONMENT = true;

describe("app", () => {
  it("should rener App", async function () {
    const element = document.createElement("div");

    //creat a React root from that id
    const root = createRoot(element);
    const setError = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter>
          <MenuItemAdd setError={setError} />
        </MemoryRouter>
      );
    });
    await act(async () => {
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });
    await act(async () => {
      await Simulate.change(
        await element.querySelector("form div label:nth-of-type(1) input"),
        {
          target: { value: "Petter petter" },
        }
      );
      await Simulate.change(
        await element.querySelector("form div label:nth-of-type(2) input"),
        {
          target: { value: "Petter petter" },
        }
      );
      await Simulate.change(
        await element.querySelector("form div label:nth-of-type(3) input"),
        {
          target: { value: "Petter petter" },
        }
      );
      await Simulate.change(
        await element.querySelector("form div label:nth-of-type(4) input"),
        {
          target: { value: "Petter petter" },
        }
      );
    });
    await act(async () => {
      await Simulate.submit(await element.querySelector("form"));
    });
    expect(element).toMatchSnapshot();
    await act(async () => {});
  });
});
