import React, { Component } from 'react';
import { TextField, Snackbar, InputAdornment, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { callApi } from '../../services/apiService';


class SignUpPage extends Component {
    constructor(props) {
      super(props);

      this.regexpFirst = /^(?!\s*$).+/;
      this.nameInput = '';
      this.passwordInput = '';
      this.emailInput = '';
      this.confirmPasswordInput = '';

      this.state = {
        isNotCorrectName: null,
        isNotCorrectEmail: null,
        isNotCorrectPassword: null,
        isNotCorrectConfirmPassword: null,
        isDisabled: true,
        isSignedUp: null,
        isSpinning: false,
        isFirstTime: true,
      }
      this.signUp = this.signUp.bind(this);
    }
  
    async signUp() {
      await this.nameValidate();
      await this.emailValidate();

      await this.passwordValidate();
      await this.confirmPasswordValidate();
      const isCorrect = await this.checkSubmitDisable();

      if(isCorrect) {
        this.setState({ isSpinning: true, isFirstTime: true, });
        const isSuccessful = await callApi('signup', this.emailInput, this.passwordInput, this.nameInput);

        setTimeout(() => {
          this.setState({ isSignedUp: isSuccessful, isSpinning: false });
          window.location.assign('http://localhost:3000/signup/chat');

        }, 500);
      } else {
        this.setState({ isFirstTime: false, });
      }
      // console.log(this.state);
    }

    nameCheck = (event) => {
      this.nameInput = event.target.value;
      if(this.state.isFirstTime) {
        const isEmpty = !this.regexpFirst.test(event.target.value);
        this.setState({ isNotCorrectName: isEmpty }, function() {
          this.checkSubmitDisable();
        });
      } else this.nameValidate();
    }
    emailCheck = (event) => {
      this.emailInput = event.target.value;
      if(this.state.isFirstTime) {
        const isEmpty = !this.regexpFirst.test(event.target.value);
        this.setState({ isNotCorrectEmail: isEmpty }, function() {
          this.checkSubmitDisable();
        });
      } else this.emailValidate();
    }
    passwordCheck = (event) => {
      this.passwordInput = event.target.value;
      if(this.state.isFirstTime) {
        const isEmpty = !this.regexpFirst.test(event.target.value);
        this.setState({ isNotCorrectPassword: isEmpty }, function() {
          this.checkSubmitDisable();
        });
      } else this.passwordValidate();
    }
    confirmPasswordCheck = (event) => {
      this.confirmPasswordInput = event.target.value;
      if(this.state.isFirstTime) {
        const isEmpty = !this.regexpFirst.test(event.target.value);
        this.setState({ isNotCorrectConfirmPassword: isEmpty }, function() {
          this.checkSubmitDisable();
        });
      } else this.confirmPasswordValidate();
    }


    nameValidate = () => {
      const regexp = /^[a-zA-Z]+$/;
      const isCorrect = regexp.test(this.nameInput);

      this.setState({ isNotCorrectName: !isCorrect }, function() {
        this.checkSubmitDisable();
      });
    }

    emailValidate = () => {
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isCorrect = regexp.test(this.emailInput);
      
      this.setState({ isNotCorrectEmail: !isCorrect }, function() {
        this.checkSubmitDisable();
      });
    }

    passwordValidate = () => {
      const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const isCorrect = regexp.test(this.passwordInput);

      this.setState({ isNotCorrectPassword: !isCorrect}, function() {
        this.checkSubmitDisable();
      });
    }

    confirmPasswordValidate = (event) => {
      const isCorrect = this.confirmPasswordInput === this.passwordInput;
      this.setState({ isNotCorrectConfirmPassword: !isCorrect }, function() {
        this.checkSubmitDisable();
      });
    }

    checkSubmitDisable = () => {
      const isCorrect = ( this.state.isNotCorrectName === false &&
        this.state.isNotCorrectEmail === false &&
        this.state.isNotCorrectPassword === false &&
        this.state.isNotCorrectConfirmPassword === false) ? true : false;
      this.setState({ isDisabled: !isCorrect});
      return isCorrect;
    }
    
    render() {
  
      return (
        <form className='signup-form' noValidate autoComplete='on'>

          <Snackbar open={this.state.isSignedUp}
            autoHideDuration={3000}
            onClose={() => this.setState({ isSignedUp: null })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="success">
              You are signed up!
            </Alert>
          </Snackbar>

          <Snackbar open={this.state.isSignedUp === false}
            autoHideDuration={3000}
            onClose={() => this.setState({ isSignedUp: null })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="error">
              This email is already in use!
            </Alert>
          </Snackbar>
          <TextField required
            error={this.state.isNotCorrectName && !this.state.isFirstTime}
            id='name' 
            label='Name'
            onChange={this.nameCheck}
            helperText={ this.state.isNotCorrectName && !this.state.isFirstTime ? 'Use only alphabet characters' : false }
          />
          <TextField required
            error={this.state.isNotCorrectEmail && !this.state.isFirstTime }
            id='email' 
            label='Email'
            type='email'
            onChange={this.emailCheck}
            helperText={ this.state.isNotCorrectEmail && !this.state.isFirstTime ? 'Incorrect email' : false }
          />
          <TextField required
            error={this.state.isNotCorrectPassword && !this.state.isFirstTime}
            id='password'
            label='Password'
            type='password'
            autoComplete='current-password'
            InputProps={{ 
              endAdornment: <InputAdornment position="end">
                              <Tooltip title='Password must contain minimum 8 characters, at least 1 letter and 1 number'><HelpOutlineIcon/></Tooltip>
                            </InputAdornment>
                        }}
            onChange={this.passwordCheck}
            helperText={ this.state.isNotCorrectPassword && !this.state.isFirstTime ? 'Password must contain minimum 8 characters, at least 1 letter and 1 number' : false }
          />
          <TextField required
            error={this.state.isNotCorrectConfirmPassword && !this.state.isFirstTime}
            id='standard-password'
            label='Confirm password'
            type='password'
            InputProps={{ 
              endAdornment: <InputAdornment position="end">
                              <Tooltip title='Password and confirm password must match'><HelpOutlineIcon/></Tooltip>
                            </InputAdornment>
                        }}
            onChange={this.confirmPasswordCheck}
            helperText={ this.state.isNotCorrectConfirmPassword && !this.state.isFirstTime ? `Password and confirm password don't match!` : false }
          />
          <Box m={2}>
            <Button
              disabled={this.state.isDisabled}
              onClick={this.signUp}
              className='signUpBtn'
              // data-testid='signUpButton'
              variant='outlined'
              id='signUpButton'
            >
              { this.state.isSpinning && <CircularProgress size={20} /> }
              { !this.state.isSpinning && <span>Sign Up</span> }
            </Button>
          </Box>
        </form>
      );
    }
}
  
export default SignUpPage;
