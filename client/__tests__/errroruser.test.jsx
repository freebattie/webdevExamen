import * as React from "react";

import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { ErrorUser } from "../pages/erroruser";
global.IS_REACT_ACT_ENVIRONMENT = true;

describe("dish", () => {
  it("should rener dish", async function () {
    const element = document.createElement("div");

    //creat a React root from that id
    const root = createRoot(element);
    const fn = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <ErrorUser />
        </MemoryRouter>
      );
    });
    expect(element).toMatchSnapshot();
    await act(async () => {});
  });
});
