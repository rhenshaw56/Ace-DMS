import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Navbar from '../../../src/components/navbar';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { isLoggedIn: true,
    user: {
      id: 1,
      firstName: 'Rowland',
      lastName: 'Ekpos',
      roleId: 1
    } },
  manageDocuments: {
    documents: [{
      access: 'public'
    }, {
      access: 'private'
    }, {
      access: 'role'
    }, {
      access: 'public'
    }],
    documentDetails: false,
    editMode: false
  },
  manageSearch: {
    searchList: [1, 2, 3]
  }
});

const props = {
  store
};


describe('Navbar', () => {
  const wrapper = shallow(<Navbar {...props} />);
  it('should have a prop called auth', () => {
    expect(wrapper.props.auth).to.be.defined; // eslint-disable-line
  });
  it('should have a logout props', () => {
    expect(wrapper.props.logout).to.be.defined; // eslint-disable-line
  });
  it('should have a logout handler to handle user logout', () => {
    expect(wrapper.logout).to.be.defined; // eslint-disable-line
  });
});
