import React from 'react';
import DocumentTable from './DocumentTable';

/**
 * @class Container
 * @extends {React.Component}
 */
class MainContainer extends React.Component {
  /**
   * @returns {Object} Jsx
   * @memberOf Container
   */
  render() {
    const tableHeaders = [
  { alias: 'ID', sortable: true, dataAlias: 'id' },
  { alias: 'Title', sortable: true, dataAlias: 'title' },
  { alias: 'Access', sortable: true, dataAlias: 'access' },
  { alias: 'Role', sortable: false, dataAlias: 'ownerRoleId' },
  { alias: '', sortable: false, dataAlias: 'ownerId' },
  { alias: '', sortable: false, dataAlias: 'ownerId' }
    ];
    return (
      <DocumentTable
        tableHeaders={tableHeaders}
        data={this.props.data}
        limit={8}
        total={this.props.data.length}
      />
    );
  }
}

MainContainer.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default MainContainer;
