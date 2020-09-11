import React, { Component } from 'react';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Tab, AppBar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import LogInPage from 'components/loginPage/loginPage';
import SignUpPage from 'components/signupPage/signupPage';


const styles = theme => ({
    tabContext: {
        borderRadius: '0',
        backgroundColor: '#1F3044',      
    }
});


class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tabPage: '2',
        }
    }

    componentDidMount = () => {
        const tabPage = localStorage.getItem('tabPage');
        this.setState({ 'tabPage': tabPage === '1' ? tabPage : '2' });
    }

    handleChange = (event, newValue) => {
        this.setState({ tabPage: newValue });
        localStorage.setItem('tabPage', newValue);
    }

    setAppState = (state) => {
        const { isAuth } = state;
        this.props.updateState({ isAuth });
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div className='tabWrapper'> 
                <TabContext className={ classes.tabContext } value={ this.state.tabPage }>
                <AppBar position='static'>
                    <TabList onChange={ this.handleChange } aria-label='simple tabs example'>
                    <Tab label='Sign Up' value='1' />
                    <Tab label='Log In' value='2' />
                    </TabList>
                </AppBar>
                <TabPanel value='1'>
                    <SignUpPage updateState = { this.setAppState } />
                </TabPanel>
                <TabPanel value='2'>
                    <LogInPage updateState = { this.setAppState } />
                </TabPanel>
                </TabContext>
          </div>
        );
    }
}


AuthPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthPage);
