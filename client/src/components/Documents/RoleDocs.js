import React from 'react';
import DocList from './DocList';


class RoleDocs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <h4 className="ace-h3">Role Docs</h4>
          <DocList
            Docs={this.props.documents}
            auth={this.props.auth}
          />
        </div>
      </div>
    );
  }
}

RoleDocs.propTypes = {
  auth: React.PropTypes.object.isRequired,
  documents: React.PropTypes.array.isRequired
};

export default RoleDocs;
