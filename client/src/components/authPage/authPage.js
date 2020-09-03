import React, { Component } from 'react';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Tab, AppBar } from '@material-ui/core';

import LogInPage from '../../components/loginPage/loginPage';
import SignUpPage from '../../components/signupPage/signupPage';



class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: localStorage.getItem('page') ? localStorage.getItem('page') : '1',
          isAuthenticated: false,
        }
    }

    handleChange(event, newValue) {
        this.setState({value: newValue});
        window.localStorage.setItem('page', newValue);
    }

    setAppState = async (state) => {
        console.log(state);
        const { isAuth } = state;
        this.setState({ isAuthenticated: isAuth });
        this.props.updateState({ isAuth: isAuth });
    }
    
    render() {
  
        return (
            <div className='tabWrapper'>
                <TabContext style='backgroundColor: #cbecec' value={this.state.value}>
                <AppBar position='static'>
                    <TabList onChange={this.handleChange.bind(this)} aria-label='simple tabs example'>
                    <Tab label='Sign Up' value='1' />
                    <Tab label='Log In' value='2' />
                    </TabList>
                </AppBar>
                <TabPanel value='1'>
                    <SignUpPage updateState = {this.setAppState} />
                </TabPanel>
                <TabPanel value='2'>
                    <LogInPage updateState = {this.setAppState} />
                </TabPanel>
                </TabContext>
          </div>

        );
    }
}

export default AuthPage;
