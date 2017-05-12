import React from 'react';
import UserTable from './UserTable';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const tableHeaders = [
  { alias: 'ID', sortable: true, dataAlias: 'id' },
  { alias: 'Email', sortable: true, dataAlias: 'email' },
  { alias: 'First Name', sortable: true, dataAlias: 'firstName' },
  { alias: 'Last Name', sortable: true, dataAlias: 'lastName' }];
    return (
      <UserTable
        tableHeaders={tableHeaders}
        data={this.props.data}
        limit={8}
        total={this.props.data.length}
      />
    );
  }
}


UserContainer.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default UserContainer;
