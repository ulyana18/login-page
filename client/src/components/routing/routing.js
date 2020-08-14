import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {
  HashRouter as Router,  // BrowserRouter
  Switch,
  Route,
  Link
} from "react-router-dom";
import LogInPage from '../login-page/login-page';
import SignUpPage from '../signup-page/signup-page';


class Routing extends Component {

  render() {

    return (
      <Router>
        <Box m={3}>
            <Link to="/signup">
            <Button
                variant="contained"
                className="methodBtn"
            >
                Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button
                variant="contained"
                className="methodBtn"
            >
                Log In
            </Button>
          </Link>

          <Switch>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/login">
              <LogInPage />
            </Route>
          </Switch>
        </Box>
      </Router>
    );
  }
}

export default Routing;