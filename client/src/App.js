import React, { Component } from 'react';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      loginValue: '',
      passwordValue: '',
      method: 'Log In',
    }
    this.signUp = this.signUp.bind(this);
    this.logIn = this.logIn.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.methodChange = this.methodChange.bind(this);
  }

  callApi(method) {
    fetch(`http://localhost:9000/api/user/${method}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user: {
            name: this.state.nameValue,
            email: this.state.emailValue,
            password: this.state.passwordValue,
          }
      }),})
      .then(res => res.json())
      .then(res => {
        window.localStorage.setItem('userName', res.user);
        window.localStorage.setItem('token', res.token);
      })
      .catch(err => {
        method === 'login' ? alert('Incorrect login or password') : alert('This email is already in use!');
      });
  }

  signUp() {
    this.callApi('signup');
  }
  logIn() {
    this.callApi('login');
  }

  nameChange(event) {
    this.setState({
      nameValue: event.target.value,
    });
  }
  emailChange(event) {
    this.setState({
      emailValue: event.target.value,
    });
  }
  passwordChange(event) {
    this.setState({
      passwordValue: event.target.value,
    });
  }
  methodChange() {
    switch(this.state.method) {
      case 'Log In': this.setState({method: 'Sign Up'}); break;
      case 'Sign Up': this.setState({method: 'Log In'}); break;
      default: break;
    }
  }


  render() {

    return (
      <div className="App">
        {this.state.method === 'Log In' &&
        <div className="signup-container">
          <form className="signup-form" noValidate autoComplete="off">
            <TextField required
              id="standard-required" 
              label="Name" 
              onChange={this.nameChange}
              margin="dense"
            />
            <TextField required
              id="standard-required" 
              label="Email" 
              onChange={this.emailChange} 
            />
            <TextField required
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={this.passwordChange}
            />
            <Box m={2}>
              <Button 
                onClick={this.signUp} // the same function for onKeyDown.Enter
                className="signUpBtn" 
                variant="contained"
              >
                Sign Up
              </Button>
            </Box>
          </form>
        </div>}

      {this.state.method === 'Sign Up' && 
      <div className="login-container">
        <form className="login-form" noValidate autoComplete="off">
            <TextField required
              id="standard-required" 
              label="Email" 
              onChange={this.emailChange} 
            />
            <TextField required
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={this.passwordChange}
            />
            <Box m={2}>
              <Button 
                onClick={this.logIn} // the same function for onKeyDown.Enter
                className="logInBtn" 
                variant="contained"
              >
                Log In
              </Button>
            </Box>
          </form>

      </div>}
      <Box m={3}>
        <Button
          onClick={this.methodChange}
          variant="contained"
          className="methodBtn"
        >
          {this.state.method}
        </Button>
      </Box>
    </div>
    );
  }
}

export default App;
