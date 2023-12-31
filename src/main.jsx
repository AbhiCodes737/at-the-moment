import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={import.meta.env.DEV ? "" : "/at-the-moment/"}>
    <App />
  </BrowserRouter>
);
