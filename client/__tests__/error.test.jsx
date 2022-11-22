import * as React from "react";

import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { ErrorUser } from "../pages/erroruser";
import { Error } from "../pages/error";
global.IS_REACT_ACT_ENVIRONMENT = true;

describe("error", () => {
  it("should render error", async function () {
    const element = document.createElement("div");

    //creat a React root from that id
    const root = createRoot(element);
    const fn = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Error error={"this is a test"} />
        </MemoryRouter>
      );
    });
    expect(element).toMatchSnapshot();
    await act(async () => {});
  });
});
