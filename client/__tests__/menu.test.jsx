import * as React from "react";

import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { Dish } from "../pages/menu";

global.IS_REACT_ACT_ENVIRONMENT = true;

describe("dish", () => {
  it("should rener dish", async function () {
    const element = document.createElement("div");
    const mockFetchPromise = jest.fn();

    //creat a React root from that id
    const root = createRoot(element);
    const fn = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Dish d={{ id: 2, name: "" }} orders={[]} setOrders={jest.fn()} />
        </MemoryRouter>
      );
    });

    await act(async () => {
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
      await Simulate.click(element.querySelector(":nth-of-type(1) button"));
    });
    expect(element).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;
  });
});
