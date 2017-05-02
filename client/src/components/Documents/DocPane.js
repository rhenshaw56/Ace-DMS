import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import PublicDocs from './PublicDocs';
import PrivateDocs from './PrivateDocs';
import RoleDocs from './RoleDocs';


export default class DocPane extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="row">
          <div id="public" className="col s12 push-s2">
            <PublicDocs
              documents={this.props.publicDocuments}
              auth={this.props.auth}
            />
          </div>
          <div className="divider" />
          <div id="role" className="col s12 push-s2">
            <PrivateDocs
              documents={this.props.privateDocuments}
              auth={this.props.auth}
            />
          </div>
           <div className="divider" />
          <div id="private" className="col s12 push-s2">
            <RoleDocs
              documents={this.props.roleDocuments}
              auth={this.props.auth}
            />
          </div>
        </div>
      </div>
    );
  }
}

DocPane.propTypes = {
  publicDocuments: React.PropTypes.array.isRequired,
  privateDocuments: React.PropTypes.array.isRequired,
  roleDocuments: React.PropTypes.array.isRequired,
  auth: React.PropTypes.object.isRequired,
};
