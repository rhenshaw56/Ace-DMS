import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DocumentsCard from
   '../../../src/components/Documents/DocumentCard';

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
describe('<DocumentsCard />', () => {
  it('should have props a prop called auth', () => {
    const wrapper = shallow(<DocumentsCard {...props} />);
    expect(wrapper.props.auth).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called title', () => {
    const wrapper = shallow(<DocumentsCard {...props} />);
    expect(wrapper.props.title).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called id', () => {
    const wrapper = shallow(<DocumentsCard {...props} />);
    expect(wrapper.props.id).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called ownerId', () => {
    const wrapper = shallow(<DocumentsCard {...props} />);
    expect(wrapper.props.ownerId).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called actions', () => {
    const wrapper = shallow(<DocumentsCard {...props} />);
    expect(wrapper.props.actions).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called content', () => {
    const wrapper = shallow(<DocumentsCard {...props} />);
    expect(wrapper.props.content).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called access', () => {
    const wrapper = shallow(<DocumentsCard {...props} />);
    expect(wrapper.props.access).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called date', () => {
    const wrapper = shallow(<DocumentsCard {...props} />);
    expect(wrapper.props.date).to.be.defined; // eslint-disable-line
  });
});


