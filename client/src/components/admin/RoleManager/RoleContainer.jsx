import React from 'react';
import DocumentTable from './RoleTable';

/**
 * @class Container
 * @extends {React.Component}
 */
class RoleContainer extends React.Component {
  /**
   * @returns {Object} Jsx
   * @memberOf RoleContainer
   */
  render() {
    const tableHeaders = [
  { alias: 'ID', sortable: true, dataAlias: 'id' },
  { alias: 'Title', sortable: true, dataAlias: 'title' }
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

RoleContainer.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default RoleContainer;
