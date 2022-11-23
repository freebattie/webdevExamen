import * as React from "react";

import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { LoggedInnEmployee } from "../pages/loggedinnemployee";

global.IS_REACT_ACT_ENVIRONMENT = true;

describe("loggedinn", () => {
  it("should rener itemmenu", async function () {
    const element = document.createElement("div");
    const mockFetchPromise = jest.fn();

    //creat a React root from that id
    const root = createRoot(element);
    const fn = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <LoggedInnEmployee
            user={{ name: "test", username: "200", role: "bla" }}
          />
        </MemoryRouter>
      );
    });

    await act(async () => {
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });
    await act(async () => {});

    expect(element).toMatchSnapshot();
    global.fetch.mockClear();
    delete global.fetch;
  });
});
