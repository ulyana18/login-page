import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import AuthPage from 'components/authPage/authPage';
import ChatPage from 'components/chatPage/chatPage';
import { callApiCheckToken } from 'services/apiService';



class App extends Component {
  constructor(props) {
    super(props);
  }

  checkToken = () => callApiCheckToken();


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
              <Button color="inherit">Log out</Button>
            </Toolbar>
          </AppBar>
          <BrowserRouter>
            <Switch>
              <Route exact path='/signup' component={AuthPage}/>
              <Route exact path='/chat' component={ChatPage}/>
              {/* <Route path='/roster' component={Roster}/>
              <Route path='/schedule' component={Schedule}/> */}
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;