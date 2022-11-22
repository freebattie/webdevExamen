import * as React from "react";

import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { MyOrders } from "../pages/myorders";
import { Appcontext } from "../lib/appcontext.jsx";
import { Dishes } from "../pages/dishes.jsx";
global.IS_REACT_ACT_ENVIRONMENT = true;

describe("app", () => {
  it("should rener App", async function () {
    const element = document.createElement("div");

    //creat a React root from that id
    const root = createRoot(element);
    const fn = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter>
          <MyOrders />
        </MemoryRouter>
      );
    });
    expect(element).toMatchSnapshot();
    await act(async () => {});
  });

  it("should rener orders", async function () {
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
        orders: [
          {
            name: "test",
            price: 200,
            description: "d",
            vegan: true,
            type: "pizza",
          },
        ],
      },
    ];
    const setError = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Appcontext.Provider value={{ listOrders: () => listDishes2 }}>
            <MyOrders setError={setError} />
          </Appcontext.Provider>
        </MemoryRouter>
      );
    });
    const mockFetchPromise = jest.fn();
    await act(async () => {
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });

    expect(element).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;
  });
});
