import React from 'react';
import Main from './Main';


export default class DocumentPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const isPublic = window.location.pathname === '/';
    const isPrivate = window.location.pathname === '/privateDocs';
    const isRole = window.location.pathname === '/roleDocs';
    return (
      <div className="content">
        <div className="row">
          <div id="public" className="col s12">
            {isPublic ?
              <Main
                documents={this.props.publicDocuments}
                auth={this.props.auth}
              /> : ''
            }{isPrivate ?
              <Main
                documents={this.props.privateDocuments}
                auth={this.props.auth}
              /> : ''
            }{isRole ?
              <Main
                documents={this.props.roleDocuments}
                auth={this.props.auth}
              /> : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

DocumentPanel.propTypes = {
  publicDocuments: React.PropTypes.array.isRequired,
  privateDocuments: React.PropTypes.array.isRequired,
  roleDocuments: React.PropTypes.array.isRequired,
  auth: React.PropTypes.object.isRequired,
};
