import * as React from "react";
import { render } from "react-dom";

require('./styles.css');

import App from "./app/App";

render(
  <App />,
  document.getElementById("root")
);