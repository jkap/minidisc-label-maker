import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "./style.scss";

const rootElement = document.getElementById("root");
render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
