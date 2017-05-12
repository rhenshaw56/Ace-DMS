import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Editor } from
   '../../../src/components/Documents/Editor';

const props = {
  auth: { isLoggedIn: true,
    user: {
      id: 1,
      firstName: 'Rowland',
      lastName: 'Ekpos',
      roleId: 1
    } },
  manageDocuments: {
    document: {
      access: 'public',
      id: 12,
      title: 'Practice',
      content: "I got fee from my momma's leash, hence i'm free",
      ownerId: 1,
      date: 'some date today',
    },
    documentDetails: false,
    editMode: true
  },
  manageSearch: {
    searchList: [1, 2, 3]
  }
};

describe('<Editor />', () => {
  it('should have props a prop called auth', () => {
    const wrapper = shallow(<Editor {...props} />);
    expect(wrapper.props.auth).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called user', () => {
    const wrapper = shallow(<Editor {...props} />);
    expect(wrapper.props.user).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called editMode', () => {
    const wrapper = shallow(<Editor {...props} />);
    expect(wrapper.props.editMode).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called content', () => {
    const wrapper = shallow(<Editor {...props} />);
    expect(wrapper.props.content).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called access', () => {
    const wrapper = shallow(<Editor {...props} />);
    expect(wrapper.props.access).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called title', () => {
    const wrapper = shallow(<Editor {...props} />);
    expect(wrapper.props.title).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called id', () => {
    const wrapper = shallow(<Editor {...props} />);
    expect(wrapper.props.id).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called ownerId', () => {
    const wrapper = shallow(<Editor {...props} />);
    expect(wrapper.props.ownerId).to.be.defined; // eslint-disable-line
  });
});


