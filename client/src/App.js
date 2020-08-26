import React, { Component } from 'react';
import './App.css';
import Routing from './components/routing/routing';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Tab, AppBar, Snackbar } from '@material-ui/core';

import LogInPage from './components/loginPage/loginPage';
import SignUpPage from './components/signupPage/signupPage';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
    }
  }

  handleChange(event, newValue) {
    this.setState({value: newValue});
  }

  render() {

    return (
      <div className='App'>
        {/* <Routing/> */}

        <div className='tabWrapper'>
          <TabContext style='backgroundColor: #cbecec' value={this.state.value}>
            <AppBar position='static'>
              <TabList onChange={this.handleChange.bind(this)} aria-label='simple tabs example'>
                <Tab label='Sign Up' value='1' />
                <Tab label='Log In' value='2' />
              </TabList>
            </AppBar>
            <TabPanel value='1'>
              <SignUpPage />
            </TabPanel>
            <TabPanel value='2'>
              <LogInPage />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    );
  }
}

export default App;