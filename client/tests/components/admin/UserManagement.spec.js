import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserManagement from
   '../../../src/components/admin/UserManagement/UserManagement';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { isLoggedIn: true, user: { firstName: 'Rowland' } },
  manageUsers: {
    allUsers: [1, 2, 3]
  }
});


const props = {
  store
};
describe('<UserManagement />', () => {
  it('should have props a prop called auth', () => {
    const wrapper = shallow(<UserManagement {...props} />);
    expect(wrapper.props.auth).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called user', () => {
    const wrapper = shallow(<UserManagement {...props} />);
    expect(wrapper.props.user).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called users', () => {
    const wrapper = shallow(<UserManagement {...props} />);
    expect(wrapper.props.user).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called initUser', () => {
    const wrapper = shallow(<UserManagement {...props} />);
    expect(wrapper.props.initUser).to.be.defined; // eslint-disable-line
  });
});
