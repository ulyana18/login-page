import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import callApi from 'services/apiService';


class SignUpPage extends Component {
    constructor(props) {
      super(props);
      this.emailRef = React.createRef();
      this.passwordRef = React.createRef();
      this.nameRef = React.createRef();
    }
  
  
    signUp = () => callApi('signup', this.emailRef.current.value, this.passwordRef.current.value, this.nameRef.current.value);
    
    render() {
  
      return (
        <div className="App">
          <div className="signup-container">
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
                  onClick={this.signUp}
                  className="signUpBtn" 
                  variant="contained"
                >
                  Sign Up
                </Button>
              </Box>
            </form>
        </div>
      </div>
      );
    }
}
  
export default SignUpPage;
