import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import AuthPage from './components/authPage/authPage';
import ChatPage from './components/chatPage/chatPage';
import { callApiCheckToken } from './services/apiService';



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
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    localStorage.setItem('isAuth', false);

    this.setState({ isAuth: false });
  }

  componentDidMount = () => {
    this.setState({ isAuth: JSON.parse(localStorage.getItem('isAuth')) || false });
  }

  render() {

    return (
        <div className='App'>
          <AppBar position="static">
            <Toolbar>
            { this.state.isAuth ? 
              <Button
                className='checkTokenBtn' 
                variant='contained'
                onClick={ this.checkToken }
              >
                Refresh Access Token
              </Button> : false }

            { this.state.isAuth ? 
              <Button
                className='logOutBtn' 
                color='inherit' 
                onClick={ this.logOut }
              >
                Log out
              </Button> : false }
            </Toolbar>
          </AppBar>
          <BrowserRouter>
          { this.state.isAuth ? <Redirect to='/chat' /> : <Redirect to='/signup' /> }
            <Switch>
              <Route path='/signup' component={() => <AuthPage updateState = { this.setAppState } />} />
              <Route path='/chat' component={() => {
                return this.state.isAuth ?
                  <ChatPage updateState={ this.setAppState } /> 
                  : <AuthPage updateState={ this.setAppState } />;
                }} />
              <Route component={() => {
                return this.state.isAuth ?
                  <ChatPage updateState={ this.setAppState } /> 
                  : <AuthPage updateState={ this.setAppState } />;
              }} />

            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
