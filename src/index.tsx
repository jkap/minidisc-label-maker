import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./style.scss";

navigator.serviceWorker.register(
    new URL("service-worker.js", import.meta.url),
    { type: "module" }
);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
