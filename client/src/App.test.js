import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from "enzyme-adapter-react-16";
import Button from '@material-ui/core/Button';
import { TextField, IconButton } from '@material-ui/core';


Enzyme.configure({ adapter: new Adapter() });

import SignUpPage from './components/signupPage/signupPage';
import ChatPage from './components/chatPage/chatPage';


describe('<SignUp />', () => {
  it('should not show signup button if all inputs are empty', function() {
    const wrapper = mount(<SignUpPage/>);
    expect(wrapper.state('isDisabled')).to.equal(true);
  });

  it('should not show spinner if signup btn is disabled and inputs are empty', function() {
    const wrapper = mount(<SignUpPage/>);
    expect(wrapper.state('isSpinning')).to.equal(false);
  });

  it('should not show signup btn after click if inputs do not pass validation', function() {
    const wrapper = mount(<SignUpPage/>);
    wrapper.setState({ isDisabled: false });
    wrapper.find(Button).simulate('click');
    expect(wrapper.state('isDisabled')).to.equal(true);
  });

  it('should update email state', async function() {
    const wrapper = mount(<SignUpPage/>);
    wrapper.instance().emailInput = 'qws@ede.ee';
    wrapper.setState({ isDisabled: false });
    await wrapper.find(Button).simulate('click');
    expect(wrapper.state('isNotCorrectEmail')).to.equal(false);
  });

  it('should not show signup button if name input does not pass validation', function() {
    const wrapper = mount(<SignUpPage/>);
    wrapper.instance().nameInput = 'as';
    wrapper.instance().emailInput = 'ecjj@ws.cd';
    wrapper.instance().passwordInput = 'qwerty12';
    wrapper.instance().confirmPasswordInput = 'qwerty1234';
    wrapper.setState({ isDisabled: false });
    wrapper.find(Button).simulate('click');
    expect(wrapper.state('isDisabled')).to.equal(true);
  });


  it('should not show signup button if confirm password is not the same as password', function() {
    const wrapper = mount(<SignUpPage/>);
    wrapper.instance().nameInput = 'as12';
    wrapper.instance().emailInput = 'ecjj@ws.cd';
    wrapper.instance().passwordInput = 'qwerty12';
    wrapper.instance().confirmPasswordInput = 'qwerty12';
    wrapper.setState({ isDisabled: false });
    wrapper.find(Button).simulate('click');
    expect(wrapper.state('isNotCorrectName')).to.equal(true);
    expect(wrapper.state('isDisabled')).to.equal(true);
  });

  it('should not show signup button if password does not pass validation', async function() {
    const wrapper = mount(<SignUpPage/>);
    wrapper.instance().nameInput = 'as';
    wrapper.instance().emailInput = 'ecjj@ws.cd';
    wrapper.instance().passwordInput = 'qwerty1';
    wrapper.instance().confirmPasswordInput = 'qwerty1';
    wrapper.setState({ isDisabled: false });
    await wrapper.find(Button).simulate('click');
    await wrapper.update();
    expect(wrapper.state('isNotCorrectPassword')).to.equal(true);
    expect(wrapper.state('isDisabled')).to.equal(true);
  });

  it('should not show signup button if name input is empty', async function() {
    const wrapper = mount(<SignUpPage/>);
    wrapper.instance().emailInput = 'ecjj@ws.cd';
    wrapper.instance().passwordInput = 'qwerty12';
    wrapper.instance().confirmPasswordInput = 'qwerty12';
    wrapper.setState({ isDisabled: false });
    await wrapper.find(Button).simulate('click');
    await wrapper.update();
    expect(wrapper.state('isNotCorrectName')).to.equal(true);
    expect(wrapper.state('isDisabled')).to.equal(true);
  });

  it('should not show signup button if name input is empty', async function() {
    const wrapper = mount(<SignUpPage/>);
    wrapper.instance().emailInput = 'ecjj@ws.cd';
    wrapper.instance().passwordInput = 'qwerty12';
    wrapper.instance().confirmPasswordInput = 'qwerty12';
    await wrapper.setState({ isNotCorrectEmail: false, isNotCorrectPassword: false, isNotCorrectConfirmPassword: false, isFirstTime: false });
    await wrapper.find(`.MuiInputBase-input`).at(0).simulate('change', { target: { value: 'as' } });
    await wrapper.update();
    expect(wrapper.state('isNotCorrectName')).to.equal(false);
    expect(wrapper.state('isDisabled')).to.equal(false);
  });

  it('should not show signup button if confirm password is not the same as password', async function() {
    const wrapper = mount(<SignUpPage/>);
    wrapper.instance().nameInput = 'qwd';
    wrapper.instance().emailInput = 'ecjj@ws.cd';
    wrapper.instance().passwordInput = 'qwerty12';
    await wrapper.setState({ isNotCorrectName: false, isNotCorrectEmail: false, isNotCorrectPassword: false, isNotCorrectConfirmPassword: false, isFirstTime: false });
    await wrapper.find(`.MuiInputBase-input`).at(3).simulate('change', { target: { value: 'as' } });
    await wrapper.update();
    expect(wrapper.state('isNotCorrectConfirmPassword')).to.equal(true);
    expect(wrapper.state('isDisabled')).to.equal(true);
  });

})

describe('Chat page', () => {
  it('should send message after send button click', async function() {
    const wrapper = mount(<ChatPage/>);
    wrapper.find(IconButton).simulate('click');
    await wrapper.update();
    expect(wrapper.state('isSend')).to.equal(true);
  });
  it('should send message after keyDown = Enter', async function() {
    const wrapper = mount(<ChatPage/>);
    wrapper.find(TextField).props().onKeyDown({ key: 'Enter' });
    await wrapper.update();
    expect(wrapper.state('isSend')).to.equal(true);
  });

})
