import { createRoot } from "react-dom/client";

import { App } from "./app";

// get the root element in index.html
const container = document.getElementById("app");
//creat a react root from that id
const root = createRoot(container);

root.render(<App />);
