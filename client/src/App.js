import React, { Component } from 'react';
import 'App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import AuthPage from 'components/authPage/authPage';
import ChatPage from 'components/chatPage/chatPage';
import { callApiCheckToken } from 'services/apiService';


const styles = theme => ({
  headerButton: {
    padding: '6px 16px',
    fontSize: '0.85rem',
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#fb9039af',

    '&:hover': {
      backgroundColor: '#f3984d8f',
    }
  }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    }
  }

  checkToken = () => callApiCheckToken();

  setAppState = async (state) => {
    const { isAuth } = state;
    if (!isAuth) this.logOut();
    else {
      this.setState({ isAuth: JSON.parse(isAuth) });
      localStorage.setItem('isAuth', isAuth);
    }
  }

  logOut = () => {
    this.clearLocalStorage();
  }

  componentDidMount = () => {
    this.setState({ isAuth: JSON.parse(localStorage.getItem('isAuth')) || false });

    window.addEventListener('storage', this.checkUser);
  }

  checkUser = () => {
    this.clearLocalStorage();
  }

  clearLocalStorage = () => {
    this.setState({ isAuth: false });

    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    localStorage.setItem('isAuth', false);
  }


  render() {
    
    const { classes } = this.props;
    const { isAuth } = this.state;

    return (
        <div className='App'>
          <AppBar position='static'>
            <Toolbar>
            { isAuth && <Button
                className={ classes.headerButton }
                variant='contained'
                onClick={ this.checkToken }
              >
                Refresh Access Token
              </Button> }

            { isAuth && <Button
                className={ classes.headerButton }
                color='inherit' 
                onClick={ this.logOut }
              >
                Log out
              </Button> }
            </Toolbar>
          </AppBar>
          <BrowserRouter>
          { this.state.isAuth ? <Redirect to='/chat' /> : <Redirect to='/signup' /> }
            <Switch>
              <Route path='/signup' component={() => <AuthPage updateState = { this.setAppState } />} />
              <Route path='/chat' component={() => <ChatPage updateState={ this.setAppState } /> } />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
