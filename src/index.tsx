import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "./style.scss";

navigator.serviceWorker.register(
    new URL("service-worker.js", import.meta.url),
    { type: "module" }
);

const rootElement = document.getElementById("root");
render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
