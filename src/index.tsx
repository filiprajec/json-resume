import * as ReactDOMClient from "react-dom/client";

import { Resume } from "./resume";
import { ThemeProvider } from "./context";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container!);

root.render(
  <ThemeProvider>
    <Resume />
  </ThemeProvider>
);
