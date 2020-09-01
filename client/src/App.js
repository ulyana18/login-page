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

  render() {

    // if (this.state.isAuth) {
    //   return <Redirect to='/signup/chat' />
    // }

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
              <Button color='inherit'>Log out</Button>
            </Toolbar>
          </AppBar>
          <BrowserRouter>
          { this.state.isAuth ? <Redirect to='/signup/chat' /> : false }
            <Switch>
              <Route exact path='/signup' component={() => <AuthPage updateState = {this.setAppState} />} />
              <Route exact path='/signup/chat' component={() => {
                console.log(this.state.isAuth);
                return this.state.isAuth ?  <ChatPage /> : <AuthPage updateState = {this.setAppState} />;
                // return <ChatPage />;
              }} />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;