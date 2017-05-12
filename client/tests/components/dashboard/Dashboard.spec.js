import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dashboard from
   '../../../src/components/Dashboard';

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
describe('<Dashboard />', () => {
  it('should have props a prop called auth', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.props.auth).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called user', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.props.user).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called publicDocuments', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.props.publicDocuments).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called roleDocuments', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.props.roleDocuments).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called privateDocuments', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.props.privateDocuments).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called isLoggedIn', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.props.isLoggedIn).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called getUsers', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.props.getUsers).to.be.defined; // eslint-disable-line
  });
  it('should have props a prop called loadAllDocument', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.props.loadAllDocument).to.be.defined; // eslint-disable-line
  });
  it('should render the Sidebar component', () => {
    const wrapper = mount(
      <MuiThemeProvider >
        <Provider store={store}>
          <Dashboard {...props} />
        </Provider>
      </MuiThemeProvider>);
    expect(wrapper.find('Sidebar')).to.have.length(1); // eslint-disable-line
  });
  it('should render the Footer component', () => {
    const wrapper = mount(
      <MuiThemeProvider >
        <Provider store={store}>
          <Dashboard {...props} />
        </Provider>
      </MuiThemeProvider>);
    expect(wrapper.find('Footer')).to.have.length(1); // eslint-disable-line
  });
  it('should render the Nav component', () => {
    const wrapper = mount(
      <MuiThemeProvider >
        <Provider store={store}>
          <Dashboard {...props} />
        </Provider>
      </MuiThemeProvider>);
    expect(wrapper.find('Nav')).to.have.length(1); // eslint-disable-line
  });
});

