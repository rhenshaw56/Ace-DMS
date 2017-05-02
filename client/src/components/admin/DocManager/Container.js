import React from 'react';
import DocTable from './DocTable';

/**
 * @class Container
 * @extends {React.Component}
 */
class Container extends React.Component {
  /**
   * @returns {Object} Jsx
   * @memberOf Container
   */
  render() {
    const tableHeaders = [
  { alias: 'ID', sortable: true, dataAlias: 'id' },
  { alias: 'Title', sortable: true, dataAlias: 'title' },
  { alias: 'Access', sortable: true, dataAlias: 'access' },
  { alias: 'Owner ID', sortable: true, dataAlias: 'ownerId' },
  { alias: 'Role', sortable: false, dataAlias: 'ownerRoleId' },
    ];
    return (
      <DocTable
        tableHeaders={tableHeaders}
        data={this.props.data}
        limit={8}
        total={this.props.data.length}
      />
    );
  }
}

Container.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default Container;
