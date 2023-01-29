import "./index.css";

import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware,createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import App from "./containers/pages/App";
import rootReducer from "./reducers/rootReducer";
import { tealLightGreenTheme } from "./styles/MUITheme";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={tealLightGreenTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
