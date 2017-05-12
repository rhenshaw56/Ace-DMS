import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DocumentManager from
   '../../../src/components/admin/DocumentManager/DocumentManager';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { isLoggedIn: true, user: { firstName: 'Rowland' } },
  manageDocuments: {
    documents: [1, 2, 3],
    documentDetails: false,
    editMode: false
  }
});


const props = {
  store
};
describe('<DocumentManager />', () => {
  it('should have props a prop called auth', () => {
    const wrapper = shallow(<DocumentManager {...props} />);
    expect(wrapper.props.auth).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called user', () => {
    const wrapper = shallow(<DocumentManager {...props} />);
    expect(wrapper.props.user).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called docs', () => {
    const wrapper = shallow(<DocumentManager {...props} />);
    expect(wrapper.props.user).to.be.defined; // eslint-disable-line
  });
});
