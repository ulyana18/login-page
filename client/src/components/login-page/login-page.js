import React, { Component } from 'react';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import callApi from '../../services/api-service';
import './App.css';


class LogInPage extends Component {
    constructor(props) {
      super(props);
      this.emailRef = React.createRef();
      this.passwordRef = React.createRef();
    }
  
  
    logIn = () => callApi('login', this.emailRef.current.value, this.passwordRef.current.value); 
  
    render() {
  
      return (
        <div className="App">
          {/* <div className="signup-container">
            <form className="signup-form" noValidate autoComplete="off">
              <TextField required
                id="standard-required" 
                label="Name"
                inputRef={this.nameRef}
              />
              <TextField required
                id="standard-required" 
                label="Email"
                inputRef={this.emailRef}
              />
              <TextField required
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                inputRef={this.passwordRef}
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
        </div> */}
  
        <div className="login-container">
          <form className="login-form" noValidate autoComplete="off">
                <TextField required
                    id="standard-required" 
                    label="Email"
                    inputRef={this.emailRef}
                />
                <TextField required
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    inputRef={this.passwordRef}
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
        </div>
      </div>
      );
    }
}
  
export default     callApi(method) {
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
;
  