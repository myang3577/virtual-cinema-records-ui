import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import About from "./About";

const homeLink = "/";
const aboutLink = "/about";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to={homeLink}>Home</Link>
          </li>
          <li>
            <Link to={aboutLink}>About</Link>
          </li>
        </ul>

        <Switch>
          <Route path={aboutLink}>
            <About />
          </Route>
          <Route path={homeLink}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
