import * as React from "react";

import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { Appcontext } from "../lib/appcontext.jsx";
import { useLoader } from "../lib/useLoading.jsx";
import { Dish } from "../pages/dish.jsx";
import { Dishes } from "../pages/dishes.jsx";

global.IS_REACT_ACT_ENVIRONMENT = true;
/* describe("dish", () => {
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
  */
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
describe("dishes", () => {
  it("should rener dishes", async function () {
    const element = document.createElement("div");

    //creat a React root from that id
    const root = createRoot(element);
    const listDishes2 = [
      {
        id: 0,
        name: "test",
        price: 200,
        description: "d",
        vegan: true,
        type: "pizza",
      },
    ];

    try {
      await act(async () => {
        const setError = jest.fn();
        root.render(
          <MemoryRouter initialEntries={["/"]}>
            <Appcontext.Provider value={{ listDishes: () => listDishes2 }}>
              <Dishes setError={setError} />
            </Appcontext.Provider>
          </MemoryRouter>
        );
      });
    } catch (e) {
      console.log("all good");
    }

    const mockFetchPromise = jest.fn();
    await act(async () => {
      global.fetch = await jest.fn().mockImplementation(() => mockFetchPromise);
    });
    await act(async () => {
      await Simulate.click(
        await element.querySelector("[data-testid=button]button")
      );
    });
    await act(async () => {
      await Simulate.change(
        await element.querySelector("form :nth-child(1) input"),
        {
          target: { value: "location" },
        }
      );
    });
    await act(async () => {
      await Simulate.change(
        await element.querySelector("form :nth-child(2) input"),
        {
          target: { value: "" },
        }
      );
    });
    await act(async () => {
      await Simulate.change(
        await element.querySelector("form :nth-child(3) input"),
        {
          target: { value: "08:00" },
        }
      );
    });

    await act(async () => {
      await Simulate.submit(await element.querySelector("form"));
      global.fetch.mockClear();
      delete global.fetch;
      expect(element).toMatchSnapshot();
    });
  });
});
