import * as ReactDOMClient from "react-dom/client";

import { App } from "./app";
import { PageProvider, ResumeProvider } from "./context";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container!);

root.render(
  <PageProvider>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </PageProvider>
);
