import React, { Component } from 'react';
import { TextField, Snackbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';

import { callApi } from '../../services/apiService';


class SignUpPage extends Component {
    constructor(props) {
      super(props);

      this.nameInput = '';
      this.passwordInput = '';
      this.emailInput = '';

      this.state = {
        isNotCorrectName: null,
        isNotCorrectEmail: null,
        isNotCorrectPassword: null,
        isNotCorrectConfirmPassword: null,
        isDisabled: true,
        isSignedUp: null,
      }
      this.signUp = this.signUp.bind(this);
    }
  
    async signUp() {
      const isSuccessful = await callApi('signup', this.emailInput, this.passwordInput, this.nameInput);

      this.setState({ isSignedUp: isSuccessful });
    }

    nameValidate = (event) => {
      const regexp = /^[a-zA-Z]+$/;
      const isCorrect = regexp.test(event.target.value);
      this.nameInput = event.target.value;

      this.setState({ isNotCorrectName: !isCorrect }, function() {
        this.checkSubmitDisable();
      });
    }

    emailValidate = (event) => {
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isCorrect = regexp.test(event.target.value);
      this.emailInput = event.target.value;

      this.setState({ isNotCorrectEmail: !isCorrect }, function() {
        this.checkSubmitDisable();
      });
    }

    passwordValidate = (event) => {
      const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const isCorrect = regexp.test(event.target.value);
      this.passwordInput = event.target.value;

      this.setState({ isNotCorrectPassword: !isCorrect}, function() {
        this.checkSubmitDisable();
      });
    }

    checkConfirmPassword = (event) => {
      const isCorrect = event.target.value === this.passwordInput;
      this.setState({ isNotCorrectConfirmPassword: !isCorrect }, function() {
        this.checkSubmitDisable();
      })
    }

    checkSubmitDisable = () => {
      const isCorrect = ( this.state.isNotCorrectName === false &&
        this.state.isNotCorrectEmail === false &&
        this.state.isNotCorrectPassword === false &&
        this.state.isNotCorrectConfirmPassword === false) ? true : false;
      this.setState({ isDisabled: !isCorrect});
    }
    
    render() {
  
      return (
        <form className='signup-form' noValidate autoComplete='off'>
          <Snackbar open={this.state.isSignedUp}
            autoHideDuration={3000}
            onClose={() => this.setState({ isSignedUp: null })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert variant="outlined" severity="success">
              You are signed up!
            </Alert>
          </Snackbar>

          <Snackbar open={this.state.isSignedUp === false}
            autoHideDuration={3000}
            onClose={() => this.setState({ isSignedUp: null })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert variant="outlined" severity="error">
              This email is already in use!
            </Alert>
          </Snackbar>
          <TextField required
            error={this.state.isNotCorrectName}
            id='standard-required' 
            label='Name'
            onChange={this.nameValidate}
            helperText={ this.state.isNotCorrectName ? 'Use only alphabet characters' : false }
          />
          <TextField required
            error={this.state.isNotCorrectEmail}
            id='standard-required' 
            label='Email'
            type='email'
            onChange={this.emailValidate}
            helperText={ this.state.isNotCorrectEmail ? 'Incorrect email' : false }
          />
          <TextField required
            error={this.state.isNotCorrectPassword}
            id='standard-password-input'
            label='Password'
            type='password'
            autoComplete='current-password'
            onChange={this.passwordValidate}
            helperText={ this.state.isNotCorrectPassword ? 'Password must contain minimum eight characters, at least one letter and one number' : false }
          />
          <TextField required
            error={this.state.isNotCorrectConfirmPassword}
            id='standard-password-input'
            label='Confirm password'
            type='password'
            autoComplete='current-password'
            onChange={this.checkConfirmPassword}
            helperText={ this.state.isNotCorrectConfirmPassword ? `Password and confirm password don't match!` : false }
          />
          <Box m={2}>
            <Button
              disabled={this.state.isDisabled}
              onClick={this.signUp}
              className='signUpBtn' 
              variant='contained'
            >
              Sign Up
            </Button>
          </Box>
        </form>
      );
    }
}
  
export default SignUpPage;
