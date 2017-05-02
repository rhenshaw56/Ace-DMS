import React from 'react';
import DocList from './DocList';


class UserDocs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <DocList
            Docs={this.props.documents}
            auth={this.props.auth}
          />
        </div>
      </div>
    );
  }
}

UserDocs.propTypes = {
  auth: React.PropTypes.object.isRequired,
  documents: React.PropTypes.array.isRequired
};

export default UserDocs;
