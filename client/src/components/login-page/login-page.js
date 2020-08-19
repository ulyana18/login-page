import React, { Component } from 'react';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import callApi from '../../services/api-service';


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
  
export default LogInPage;