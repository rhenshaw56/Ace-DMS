import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import UserContainer from
   '../../../src/components/admin/UserManagement/UserContainer';

describe('<UserContainer />', () => {
  it('should have props a prop called data', () => {
    const wrapper = shallow(<UserContainer data={[]} />);
    expect(wrapper.props().data).to.be.defined; // eslint-disable-line
  });
});
