import React, { Component } from 'react';
import 'App.css';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Tab, AppBar, Button } from '@material-ui/core';


import LogInPage from 'components/loginPage/loginPage';
import SignUpPage from 'components/signupPage/signupPage';
import { callApiCheckToken } from 'services/apiService';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
    }
  }

  checkToken = () => callApiCheckToken();

  handleChange(event, newValue) {
    this.setState({value: newValue});
  }

  render() {

    return (
      <div className='App'>
        <Button
          className='checkTokenBtn' 
          variant='contained'
          onClick={this.checkToken}
        >
          Refresh Access Token
          </Button>
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