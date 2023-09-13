import React from "react";
import ReactDOM from "react-dom/client";

import { Home } from "@/pages/home/index";

import { Providers } from "@/providers";

import "@/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <Home />
    </Providers>
  </React.StrictMode>,
);
