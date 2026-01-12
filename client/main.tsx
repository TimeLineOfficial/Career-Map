import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Create root only once and store it
let root = (window as any).__careermap_root;
if (!root) {
  root = createRoot(container);
  (window as any).__careermap_root = root;
}

root.render(<App />);
