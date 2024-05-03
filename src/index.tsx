import * as ReactDOMClient from "react-dom/client";
import { Resume } from "./resume";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container!);

root.render(<Resume />);
