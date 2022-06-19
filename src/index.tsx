import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "tippy.js/dist/tippy.css";

import Timestamp from "App";
import { Footer } from "Footer";

import * as serviceWorker from "serviceWorker";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Timestamp />
    <Footer />
  </React.StrictMode>,
);

serviceWorker.register(serviceWorker.SWConfig);
