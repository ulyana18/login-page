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
    console.log('in func it is', isAuth);
    this.setState({ isAuth: isAuth });
  }

  logOut = () => {
    window.localStorage.removeItem('userName');
      window.localStorage.removeItem('userEmail');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('refreshToken');
    this.setState({ isAuth: false });
  }

  render() {

    return (
        <div className='App'>
          <AppBar position="static">
            <Toolbar>
              <Button
                className='checkTokenBtn' 
                variant='contained'
                onClick={this.checkToken}
              >
                Refresh Access Token
              </Button>
              { this.state.isAuth ? <Button color='inherit' onClick={ this.logOut }>Log out</Button> : false }
            </Toolbar>
          </AppBar>
          <BrowserRouter>
          { this.state.isAuth ? <Redirect to='/signup/chat' /> : <Redirect to='/signup' /> }
            <Switch>
              <Route exact path='/signup' component={() => <AuthPage updateState = {this.setAppState} />} />
              <Route exact path='/signup/chat' component={() => {
                return this.state.isAuth ?  <ChatPage /> : <AuthPage updateState = {this.setAppState} />;
              }} />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;