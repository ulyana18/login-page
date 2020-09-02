import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import AuthPage from './components/authPage/authPage';
import ChatPage from './components/chatPage/chatPage';
import { callApiCheckToken } from './services/apiService';
import { Chat } from '@material-ui/icons';



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
    this.setState({ isAuth: isAuth });
    window.localStorage.setItem('isAuth', isAuth);
  }

  logOut = () => {
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('userEmail');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refreshToken');
    
    window.localStorage.setItem('isAuth', false);

    this.setState({ isAuth: false });
  }

  componentDidMount = () => {
    this.setState({ isAuth: window.localStorage.getItem('isAuth') || false });
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
              { this.state.isAuth === 'true' || this.state.isAuth === true ? <Button color='inherit' onClick={ this.logOut }>Log out</Button> : false }
            </Toolbar>
          </AppBar>
          <BrowserRouter>
          { this.state.isAuth === 'true' || this.state.isAuth === true ? <Redirect to='/chat' /> : <Redirect to='/signup' /> }
            <Switch>
              <Route path='/signup' component={() => <AuthPage updateState = {this.setAppState} />} />
              {/* <Route exact path='/signup/*' component={() => {
                return this.state.isAuth === 'true' || this.state.isAuth === true ?  <ChatPage /> : <AuthPage updateState = {this.setAppState} />;
                }} /> */}
              <Route path='/chat' component={() => {
                return this.state.isAuth === 'true' || this.state.isAuth === true ?  <ChatPage /> : <AuthPage updateState = {this.setAppState} />;
                }} />
              {/* <Route exact path='/chat/check' component={() => {
                return this.state.isAuth === 'true' || this.state.isAuth === true ?  <ChatPage /> : <AuthPage updateState = {this.setAppState} />;
                }} /> */}

              <Route component={() => {
                return this.state.isAuth === 'true' || this.state.isAuth === true ?  <ChatPage /> : <AuthPage updateState = {this.setAppState} />;
              }} />

            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
