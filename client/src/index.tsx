import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import rootReducer from "./reducers/otherReducer";
import rootReducer from "./reducers/rootReducer";
import App from "./components/App";

import "./index.css";

// rootReducer represents all reducers. rootReducer.tsx combines all reducers
// applyMiddleware(thunk) is used to handle async api calls. don't worry about
// thunk. just use it
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  // Always provider. Keep it like that
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
