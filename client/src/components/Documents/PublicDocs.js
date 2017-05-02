import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
// import DocCard from './DocCard';
import DocList from './DocList';


class PublicDocs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <h4 className="ace-h3">Public Docs</h4>
          <DocList
            Docs={this.props.documents}
            auth={this.props.auth}
          />
        </div>
      </div>
    );
  }
}

PublicDocs.propTypes = {
  auth: React.PropTypes.object.isRequired,
  documents: React.PropTypes.array.isRequired
};

export default PublicDocs;
