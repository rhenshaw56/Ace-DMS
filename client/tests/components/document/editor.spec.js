// import React from 'react';
// import { mount, shallow } from 'enzyme';
// import { expect } from 'chai';
// import sinon from 'sinon';
// import { Provider } from 'react-redux';

// import { Editor } from '../../../src/components/Documents/Editor';
// import { Nav } from '../../../src/components/navbar';

// describe('Editor', () => {
//   const myStore = {};
//   const props = {
//     id: 2,
//     title: 'i am awesome',
//     access: 'Public',
//     content: 'My awesomeness is phenomenal',
//     actions: () => {},
//     user: { firstName: 'Rowland' },
//     editMode: false,
//     auth: { isLoggedIn: true, user: { firstName: 'Rowland' } }
//   };

//   it('should have a prop called auth', () => {
//     const wrapper = mount(<Editor {...props} />);
//     const title = wrapper.find('.editor-title');
//     expect(title).to.equal(props.title); // eslint-disable-line
//   });
// });
