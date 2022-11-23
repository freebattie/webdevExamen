import * as React from "react";

import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import { EditMenu } from "../pages/editmenu";
import { MemoryRouter } from "react-router-dom";

global.IS_REACT_ACT_ENVIRONMENT = true;

describe("app", () => {
  it("should rener App", async function () {
    const element = document.createElement("div");

    //creat a React root from that id
    const root = createRoot(element);
    const fn = jest.fn();
    await act(async () => {
      <MemoryRouter></MemoryRouter>;
      root.render(
        <MemoryRouter>
          <EditMenu />
        </MemoryRouter>
      );
    });
    expect(element).toMatchSnapshot();
    await act(async () => {});
  });
});
