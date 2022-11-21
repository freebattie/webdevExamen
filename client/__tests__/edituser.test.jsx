import { EditUsers } from "../pages/edituser";
import { MemoryRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
global.IS_REACT_ACT_ENVIRONMENT = true;

describe("dish", () => {
  it("should rener dish", async function () {
    const element = document.createElement("div");

    //creat a React root from that id
    const root = createRoot(element);
    const useLoader = jest.fn();
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <EditUsers />
        </MemoryRouter>
      );
    });
    expect(element).toMatchSnapshot();
  });
});
