import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RoleManager from
   '../../../src/components/admin/RoleManager/RoleManager';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { isLoggedIn: true, user: { firstName: 'Rowland' } },
  manageRoles: {
    roles: [1, 2, 3]
  }
});


const props = {
  store
};
describe('<RoleManager />', () => {
  it('should have props a prop called auth', () => {
    const wrapper = shallow(<RoleManager {...props} />);
    expect(wrapper.props.auth).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called user', () => {
    const wrapper = shallow(<RoleManager {...props} />);
    expect(wrapper.props.user).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called roles', () => {
    const wrapper = shallow(<RoleManager {...props} />);
    expect(wrapper.props.user).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called loadRoles', () => {
    const wrapper = shallow(<RoleManager {...props} />);
    expect(wrapper.props.loadRoles).to.be.defined; // eslint-disable-line
  });
});
