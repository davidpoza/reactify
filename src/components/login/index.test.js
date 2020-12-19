import React, { useState as useStateMock } from 'react';
import { mount } from 'enzyme';
import { Provider } from "react-redux";

// own
import store from '../../store';
import Login from '../login';
import { getAuth, resetState } from '../../actions/user';


// mocks
jest.mock('../../actions/user', () => ({
  getAuth: jest.fn()
}));

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return ({
    ...original,
    useState: jest.fn(),
  });
});
const setState = jest.fn();


describe('Login', () => {
  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);
  })

  it('to be defined', () => {
    const wrapper = mount(<Provider store={store}><Login/></Provider>);
    expect(wrapper).toBeDefined();
  })

  it('renders', () => {
    const wrapper = mount(<Provider store={store}><Login/></Provider>);
    expect(wrapper.find('form')).toHaveLength(1);
  })

  it('setState on change email and password inputs', () => {
    const wrapper = mount(<Provider store={store}><Login/></Provider>);
    const button = wrapper.find('button');

    expect(button.prop('disabled')).toBeDefined();

    const inputEmail = wrapper.find("#email input");
    inputEmail.simulate('change', { target: { value: 'pozasuarez@gmail.com' } });
    expect(setState).toBeCalledWith('pozasuarez@gmail.com');

    const inputPassword = wrapper.find("#password input");
    inputPassword.simulate('change', { target: { value: '1234' } });
    expect(setState).toBeCalledWith('1234');
  })

  it.only('submit button gets enabled only if email and password are typed', () => {
    useStateMock.mockImplementation(jest.requireActual('react').useState);
    const wrapper = mount(<Provider store={store}><Login/></Provider>);
    const button = wrapper.find('button');
    expect(button.getDOMNode().disabled).toBe(true);

    const inputEmail = wrapper.find("#email input");
    inputEmail.simulate('change', { target: { value: 'pozasuarez@gmail.com' } });
    expect(button.getDOMNode().disabled).toBe(true);

    const inputPassword = wrapper.find("#password input");
    inputPassword.simulate('change', { target: { value: '1234' } });
    expect(button.getDOMNode().disabled).toBe(false);
  })

  it('on submit getAuth action is called', () => {
    const wrapper = mount(<Provider store={store}><Login /></Provider>);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(getAuth).toBeCalled();
  })
})