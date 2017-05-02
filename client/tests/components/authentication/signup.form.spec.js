import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Form from '../../../src/components/authentication/Signup/Form';

describe('<Form/>', () => {
  it('should have an onchange function to handle user inputs', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.onChange).to.be.defined;  // eslint-disable-line
  });

  it('should have props a prop called signup', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.props().signup).to.be.defined; // eslint-disable-line
  });
  it('should render four text input fields', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find('Input')).to.have.length(4); // eslint-disable-line
  });
  it('should render an input button', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find('Button')).to.have.length(1); // eslint-disable-line
  });
});
