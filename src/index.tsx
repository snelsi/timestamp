import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "tippy.js/dist/tippy.css";

import Timestamp from "App";
import { Footer } from "Footer";

import * as serviceWorker from "serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Timestamp />
    <Footer />
  </React.StrictMode>,
  document.getElementById("root"),
);

serviceWorker.register(serviceWorker.SWConfig);
