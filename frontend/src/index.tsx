import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import App from "./containers/pages/App";
import { ThemeProvider } from "@material-ui/core/styles";
import { tealLightGreenTheme } from "./styles/MUITheme";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";

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
