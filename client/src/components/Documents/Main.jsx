import React from 'react';
import DocumentList from './DocumentList';


class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const docs = this.props.documents.slice(0, 12);
    return (
      <div className="row">
        <div className="col s12">
          <p />
          <p />
          <DocumentList
            Docs={docs}
            auth={this.props.auth}
          />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  auth: React.PropTypes.object.isRequired,
  documents: React.PropTypes.array.isRequired
};

export default Main;
