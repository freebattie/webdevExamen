import * as React from "react";

import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { Appcontext } from "../lib/appcontext.jsx";
import { useLoader } from "../lib/useLoading.jsx";
import { Dish } from "../pages/dish.jsx";
import { Dishes } from "../pages/dishes.jsx";

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
          <Dish
            d={{ id: 2, name: "" }}
            orders={[]}
            setOrders={jest.fn()}
            val={2}
          />
        </MemoryRouter>
      );
    });

    await act(async () => {
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
      await Simulate.click(element.querySelector(":nth-of-type(1) button"));
    });
    await act(async () => {});

    expect(element).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;
  });
  
  it("should rener dish2", async function () {
    const element = document.createElement("div");
    const mockFetchPromise = jest.fn();

    //creat a React root from that id
    const root = createRoot(element);
    const fn = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Dish
            d={{ id: 2, name: "" }}
            orders={[]}
            setOrders={jest.fn()}
            val={2}
          />
        </MemoryRouter>
      );
    });

    await act(async () => {
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
      await Simulate.click(element.querySelector("footer button"));
    });
    await act(async () => {});

    expect(element).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;
  });
});

