import React, { Component } from 'react';
import { TextField, Snackbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        isSpinning: false,
      }
      this.logIn = this.logIn.bind(this);
      this.emailRef = React.createRef();
      this.passwordRef = React.createRef();
    }
  
    async logIn() {
      this.setState({ isSpinning: true});
      const isSuccessful = await callApi('login', this.emailInput, this.passwordInput);
      setTimeout(() => {
        this.setState({ isLoggedIn: isSuccessful, isSpinning: false });
      }, 500);
      setTimeout(() => {
        this.props.updateState({ isAuth: isSuccessful });
      }, 2500)
    }

    componentDidMount() {
      if (this.emailRef.current.value && this.passwordRef.current.value) {
        this.setState({ isEmailEmpty: false, isPasswordEmpty: false });
        this.checkSubmitDisable();
      }
      window.addEventListener('load', this.detectAutofill);
    }

    detectAutofill = () => {
      try {
        const isEmailAutofilled = JSON.parse(this.emailRef.current.labels[0].dataset.shrink);
        const isPasswordAutofilled = JSON.parse(this.passwordRef.current.labels[0].dataset.shrink);
        if (isEmailAutofilled && isPasswordAutofilled) {
          this.setState({ isDisabled: false, isEmailEmpty: false, isPasswordEmpty: false });
        }
      } catch(err) { }
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
        <form className='login-form' noValidate autoComplete='on'>
          <Snackbar open={this.state.isLoggedIn}
            autoHideDuration={3000}
            onClose={() => this.setState({ isLoggedIn: null })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="success">
              You are logged in!
            </Alert>
          </Snackbar>

          <Snackbar open={this.state.isLoggedIn === false} 
            autoHideDuration={3000}
            onClose={() => this.setState({ isLoggedIn: null })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="error">
              Incorrect login or password!
            </Alert>
          </Snackbar>

          <TextField required
            id='email' 
            label='Email'
            type='email'
            inputRef={this.emailRef}
            onChange={this.emailCheck}
          />
          <TextField required
            id='password'
            label='Password'
            type='password'
            autoComplete='current-password'
            inputRef={this.passwordRef}
            onChange={this.passwordCheck}
          />
          <Box m={2}>
            <Button
              disabled={this.state.isDisabled}
              onClick={this.logIn}
              className='logInBtn' 
              variant='outlined'

            >
              { this.state.isSpinning && <CircularProgress size={17} /> }
              { !this.state.isSpinning && <span>Log In</span> }
            </Button>
          </Box>
        </form>
      );
    }
}
  
export default LogInPage;
