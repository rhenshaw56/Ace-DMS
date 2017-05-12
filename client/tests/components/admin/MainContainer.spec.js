import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import MainContainer from
   '../../../src/components/admin/DocumentManager/MainContainer';

describe('<MainContainer />', () => {
  it('should have props a prop called data', () => {
    const wrapper = shallow(<MainContainer data={[]} />);
    expect(wrapper.props().data).to.be.defined; // eslint-disable-line
  });
});
