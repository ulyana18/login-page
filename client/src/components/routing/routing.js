import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import LogInPage from '../../components/loginPage/loginPage';
import SignUpPage from '../../components/signupPage/signupPage';
import callApiCheckToken from '../../services/apiService';


class Routing extends Component {

  checkToken = () => callApiCheckToken();

  render() {

    return (
      <Router>
        <Box m={3}>
            <Link to='/signup'>
            <Button
                variant='contained'
                className='methodBtn'
            >
                Sign Up
            </Button>
          </Link>
          <Link to='/login'>
            <Button
                variant='contained'
                className='methodBtn'
            >
                Log In
            </Button>
          </Link>

          <Switch>
            <Route path='/signup'>
              <SignUpPage />
            </Route>
            <Route path='/login'>
              <LogInPage />
            </Route>
          </Switch>
        </Box>

        <button onClick={this.checkToken}>check access token</button>
        {/* <button onClick={this.updateToken}>update access token</button> */}
      </Router>
    );
  }
}

export default Routing;