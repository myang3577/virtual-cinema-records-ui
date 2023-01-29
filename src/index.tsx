import "./index.css";

import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/pages/App";
import { store } from "./store";
import { tealLightGreenTheme } from "./styles/MUITheme";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={tealLightGreenTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
