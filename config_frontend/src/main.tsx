import ReactDOM from "react-dom/client";

import { Home } from "@/pages/home/index";

import { Providers } from "@/providers";

import "@/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <Home />
  </Providers>,
);
