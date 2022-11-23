import * as React from "react";

import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { MenuItem } from "../pages/menuitem.jsx";

global.IS_REACT_ACT_ENVIRONMENT = true;

describe("itemmenu", () => {
  it("should rener itemmenu", async function () {
    const element = document.createElement("div");
    const mockFetchPromise = jest.fn();

    //creat a React root from that id
    const root = createRoot(element);
    const setError = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <MenuItem
            setError={setError}
            d={{ name: "test", price: 200, description: "bla", type: "type" }}
          />
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
    await act(async () => {});

    expect(element).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;
  });
});
