import React from 'react';
import { render } from 'enzyme';

// Componente
import App from '../App';

describe(App, () => {
  it('renders correctly', () => {
    const wrapper = render(<App />);
    expect(wrapper).toMatchSnapshot();
  });
})
