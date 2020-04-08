import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Timestamp from "App";
import * as serviceWorker from "serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Timestamp />
  </React.StrictMode>,
  document.getElementById("root"),
);

serviceWorker.register();
