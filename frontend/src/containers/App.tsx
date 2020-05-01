import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { Paper, Tabs, Tab, CssBaseline } from "@material-ui/core";
import Home from "./Home";
import About from "./About";

const homeLink = "/";
const aboutLink = "/about";

function App() {
  return (
    <Router>
      <div>
        {/* Remove margins */}
        <CssBaseline />
        <Paper style={{ margin: 0 }} square>
          <Tabs value={false} indicatorColor="primary" textColor="primary">
            <Tab label="Home" component={RouterLink} to={homeLink} />
            <Tab label="About" component={RouterLink} to={aboutLink} />
          </Tabs>
        </Paper>

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
