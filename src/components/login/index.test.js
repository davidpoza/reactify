import React, { useState as useStateMock } from 'react';
import { mount } from 'enzyme';
import { Provider } from "react-redux";

// own
import store from '../../store';
import Login from '../login';


// mocks
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))
const setState = jest.fn();

describe('Login', () => {
  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState])
  })

  it('to be defined', () => {
    const wrapper = mount(<Provider store={store}><Login/></Provider>);
    expect(wrapper).toBeDefined();
  })

  it('renders', () => {
    const wrapper = mount(<Provider store={store}><Login/></Provider>);
    expect(wrapper.find('form')).toHaveLength(1);
  })

  it('email and password states get updated on type', () => {
    const wrapper = mount(<Provider store={store}><Login/></Provider>);

    const inputEmail = wrapper.find("#email input");
    inputEmail.simulate('change', { target: { value: 'pozasuarez@gmail.com' } });
    expect(setState).toBeCalledWith('pozasuarez@gmail.com');

    const inputPassword = wrapper.find("#password input");
    inputPassword.simulate('change', { target: { value: '1234' } });
    expect(setState).toBeCalledWith('1234');
  })
})