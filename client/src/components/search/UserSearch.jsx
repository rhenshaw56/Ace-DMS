import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

/**
 * Search Component Class for searching users
 * @export
 * @class Search
 * @extends {Component}
 */
export class UserSearch extends Component {
  /**
   * Creates an instance of UserSearch.
   * @param {Object} props
   * @memberof UserSearch
   */
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.state = {
      dataSource: [],
      inputValue: ''
    };
  }
  /**
   * Function to watch for Updates on Search Input
   * @returns {none} none
   * @param {Object} inputValue
   * @memberof UserSearch
   */
  onUpdateInput(inputValue) {
    this.setState({
      inputValue
    }, () => {
      this.performSearch();
    });
  }
  /**
   * Function to Open the Editor after selecting a document
   * @param {none} none
   * @returns {none} none
   * @memberof UserSearch
   */
  openEditor() {
    const selectedUser = this.state.inputValue;
    const mappedUser = this.mapUsers(selectedUser);
    const formattedUser = this.formatUser(mappedUser);
    this.props.actions.displayUser(formattedUser);
    this.context.router.push('/profile');
  }

  /**
   * Function to map found user names
   * @param {names} names - concetenated user firstname and lastname
   * @returns {Object} first index of mappedUser
   * @memberof UserSearch
   */
  mapUsers(names) {
    const { availableUsers } = this.props;
    const mappedUser = availableUsers.filter(
        user => `${user.firstName} ${user.lastName}` === names);
    return mappedUser[0];
  }
  /**
   * Function to format documents before opening the editor
   * @param {Object} user
   * @returns {Object} formattedUser
   * @memberof UserSearch
   */
  formatUser(user) { // eslint-disable-line
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roleId: 2,
      id: user.id
    };
  }

  /**
   * Function to handle searching of documents
   * @param {none} none
   * @returns {none} none
   * @memberof UserSearch
   */
  performSearch() {
    const { availableUsers } = this.props;
    const users = availableUsers.map(
      user => `${user.firstName} ${user.lastName}`
    );
    this.setState({
      dataSource: users
    });
  }

  /**
   * Function that renders Component into its parent
   * @param {none} none
   * @returns {Object} Jsx Object
   * @memberof UserSearch
   */
  render() {
    return (
      <AutoComplete
        id="search-doc"
        hintText="Search Users"
        dataSource={this.state.dataSource}
        onUpdateInput={this.onUpdateInput}
        onNewRequest={this.openEditor}
        maxSearchResults={1}
        filter={AutoComplete.caseInsensitiveFilter}
      />
    );
  }
}
UserSearch.propTypes = {
  availableUsers: React.PropTypes.array.isRequired,
  actions: React.PropTypes.func.isRequired,
};
UserSearch.contextTypes = {
  router: React.PropTypes.object
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

const mapStateToProps = (state) => {
  const allUsers = state.manageSearch.searchList;
  const currentUser = state.auth.user;
  const availableUsers = allUsers.filter(
      user => user.id !== currentUser.id
    );
  return {
    availableUsers
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
