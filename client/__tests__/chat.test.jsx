import * as React from "react";

import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Chat } from "../pages/chat.jsx";

global.IS_REACT_ACT_ENVIRONMENT = true;

describe("app", () => {
  it("should rener App", async function () {
    const element = document.createElement("div");

    //creat a React root from that id
    const root = createRoot(element);
    const fn = jest.fn();
    await act(async () => {
      root.render(<Chat />);
    });
    expect(element).toMatchSnapshot();
    await act(async () => {});
  });
});
