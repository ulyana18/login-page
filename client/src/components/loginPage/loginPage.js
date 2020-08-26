import React, { Component } from 'react';
import { TextField, Snackbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';

import { callApi } from '../../services/apiService';


class LogInPage extends Component {
    constructor(props) {
      super(props);

      this.passwordInput = '';
      this.emailInput = '';
      
      this.state = {
        isPasswordEmpty: null,
        isEmailEmpty: null,
        isDisabled: true,
        isLoggedIn: null,
      }
      this.logIn = this.logIn.bind(this);
    }
  
    // async componentDidMount() {
    //   const isSuccessful = await callApi('login', this.emailInput, this.passwordInput);
    //   console.log(isSuccessful);
    // }
    async logIn() {
      const isSuccessful = await callApi('login', this.emailInput, this.passwordInput);

      this.setState({ isLoggedIn: isSuccessful });
    }

    passwordCheck = (event) => {
      const regexp = /^(?!\s*$).+/;
      this.passwordInput = event.target.value;
      const isEmpty = !regexp.test(event.target.value);
      this.setState({ isPasswordEmpty: isEmpty }, function() {
        this.checkSubmitDisable();
      })
    }

    emailCheck = (event) => {
      const regexp = /^(?!\s*$).+/;
      this.emailInput = event.target.value;
      const isEmpty = !regexp.test(event.target.value);
      this.setState({ isEmailEmpty: isEmpty }, function() {
        this.checkSubmitDisable();
      })
    }

    checkSubmitDisable = () => {
      const isCorrect = ( this.state.isPasswordEmpty === false &&
        this.state.isEmailEmpty === false ) ? true : false;
      this.setState({ isDisabled: !isCorrect});
    }
  
    render() {
  
      return (
        <form className='login-form' noValidate autoComplete='off'>
          <Snackbar open={this.state.isLoggedIn}
            autoHideDuration={3000}
            onClose={() => this.setState({ isLoggedIn: null })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert variant="outlined" severity="success">
              You are logged in!
            </Alert>
          </Snackbar>

          <Snackbar open={this.state.isLoggedIn === false} 
            autoHideDuration={3000}
            onClose={() => this.setState({ isLoggedIn: null })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert variant="outlined" severity="error">
              Incorrect login or password!
            </Alert>
          </Snackbar>

          <TextField required
            id='standard-required' 
            label='Email'
            type='email'
            onChange={this.emailCheck}
          />
          <TextField required
            id='standard-password-input'
            label='Password'
            type='password'
            autoComplete='current-password'
            onChange={this.passwordCheck}
          />
          <Box m={2}>
            <Button
              disabled={this.state.isDisabled}
              onClick={this.logIn}
              className='logInBtn' 
              variant='contained'
            >
              Log In
            </Button>
          </Box>
        </form>
      );
    }
}
  
export default LogInPage;
