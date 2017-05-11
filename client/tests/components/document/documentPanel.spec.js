import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import DocumentPanel from '../../../src/components/Documents/DocumentPanel';


describe('<DocumentPanel/>', () => {
  it('should have props a prop called publicDocuments', () => {
    const wrapper = shallow(<DocumentPanel />);
    expect(wrapper.props().publicDocuments).to.be.defined; // eslint-disable-line
  });

  it('should have props a prop called privateDocuments', () => {
    const wrapper = shallow(<DocumentPanel />);
    expect(wrapper.props().privateDocuments).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called roleDocuuments', () => {
    const wrapper = shallow(<DocumentPanel />);
    expect(wrapper.props().roleDocuuments).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called auth', () => {
    const wrapper = shallow(<DocumentPanel />);
    expect(wrapper.props.auth).to.be.defined; // eslint-disable-line
  });
  it('should render 3 divs', () => {
    const wrapper = shallow(<DocumentPanel />);
    expect(wrapper.find('div')).to.have.length(3); // eslint-disable-line
  });
});

