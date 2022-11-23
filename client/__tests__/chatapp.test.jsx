import * as React from "react";

import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { ChatApplication } from "../pages/chatApp";

global.IS_REACT_ACT_ENVIRONMENT = true;

describe("app", () => {
  it("should rener App", async function () {
    const element = document.createElement("div");

    //creat a React root from that id
    const root = createRoot(element);
    const onNewMessage = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter>
          <ChatApplication
            messages={["en", "to"]}
            onNewMessage={onNewMessage}
          />
        </MemoryRouter>
      );
    });
    await act(async () => {
      await Simulate.change(await element.querySelector("footer form input"), {
        target: { value: "Petter petter" },
      });
    });
    await act(async () => {
      await Simulate.submit(await element.querySelector("form"));
    });
    expect(element).toMatchSnapshot();
    await act(async () => {});
  });
});
