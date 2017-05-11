// import React from 'react';
// import { mount } from 'enzyme';
// import { expect } from 'chai';
// import sinon from 'sinon';

// import { DocumentCard } from '../../../src/components/Documents/DocumentCard';

// describe('<DocumentCard />', () => {
//   const props = {
//     title: 'My awesome doc',
//     id: 56,
//     ownerId: 12,
//     actions: {},
//     content: 'awesome awesome awesome awesome awesome awesome',
//     role: 'private',
//     access: 'private',
//     auth: { isLoggedIn: true, user: { firstName: 'Rowland' } }
//   };
//   const wrapper = mount(<DocumentCard {...props} />);
//   wrapper.deleteDocument = sinon.spy();
//   it('should have all the required props', () => {
//     expect(wrapper.props().title).to.be.defined; // eslint-disable-line
//     expect(wrapper.props().id).to.be.defined; // eslint-disable-line
//     expect(wrapper.props().ownerId).to.be.defined; // eslint-disable-line
//     expect(wrapper.props().actions).to.be.defined; // eslint-disable-line
//     expect(wrapper.props().content).to.be.defined; // eslint-disable-line
//     expect(wrapper.props().access).to.be.defined; // eslint-disable-line
//   });
//   it('should have an editDocument function', () => {
//     expect(wrapper.editDocument).to.be.defined; // eslint-disable-line
//   });
//   it('should have a deleteDocument function', () => {
//     expect(wrapper.deleteDocument).to.be.defined; // eslint-disable-line
//   });
// });
