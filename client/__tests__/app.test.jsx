import * as React from "react";

import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { App } from "../app";
global.IS_REACT_ACT_ENVIRONMENT = true;

describe("app", () => {
  it("should rener App", async function () {
    const element = document.createElement("div");

    //creat a React root from that id
    const root = createRoot(element);
    const fn = jest.fn();
    await act(async () => {
      root.render(<App />);
    });
    expect(element).toMatchSnapshot();
    await act(async () => {});
  });
});
