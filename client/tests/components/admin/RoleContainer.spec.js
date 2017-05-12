import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import RoleContainer from
   '../../../src/components/admin/RoleManager/RoleContainer';

describe('<RoleContainer />', () => {
  it('should have props a prop called data', () => {
    const wrapper = shallow(<RoleContainer data={[]} />);
    expect(wrapper.props().data).to.be.defined; // eslint-disable-line
  });
});
