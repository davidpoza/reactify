import React from 'react';
import {mount} from 'enzyme';
import { Provider } from "react-redux";

// own
import store from '../../store';
import ProfileView from '../profile-view';

describe('ProfileView', () => {
  it('should render if redux store has an user', () => {
    store.dispatch({ type:'AUTH_FULFILLED', payload: { user: { username: 'david'} } })
    const wrapper = mount(<Provider store={store}><ProfileView/></Provider>);
    expect(wrapper).toBeDefined();
  })

  it('renders empty it no user is logged', () => {
    store.dispatch({ type:'AUTH_FULFILLED', payload: { user: null }  })
    const wrapper = mount(<Provider store={store}><ProfileView/></Provider>);
    expect(wrapper.isEmptyRender()).toBe(true);
  })
})
