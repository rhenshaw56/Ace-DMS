import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { Modal, Button, Row } from 'react-materialize';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';

export class DocumentCard extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.editDocument = this.editDocument.bind(this);
  }
  editDocument(e) {
    e.preventDefault();
    const formattedDocument = {
      title: this.props.title,
      content: this.props.content,
      access: this.props.access,
      id: this.props.id,
      ownerId: this.props.ownerId,
      date: this.props.date
    };
    this.props.actions.editDocument(formattedDocument);
    this.context.router.push('/editor');
  }
  deleteDocument(e) {
    e.preventDefault();
    if (this.props.ownerId === this.props.auth.user.id || this.props.auth.user.roleId === 1) {
      this.props.actions.deleteDocumentById(this.props.id);
    } else {
      toastr.error(
               `You dont have the access rights
               required to delete ${this.props.title}`
        );
    }
  }
  render() {
    let viewStatus = (this.props.ownerId === this.props.auth.user.id
                      || this.props.auth.user.roleId === 1
                     );
    if (this.props.access === 'public') {
      viewStatus = true;
    }
    return (
      <div className="row">
        <div className="card ace-card">
          <div className="card-content">
            <span className="card-title doc-title">{this.props.title}</span>
            <p>{this.props.content.slice(0, 15)}...</p>
          </div>
          <div className="card-action row">
            <div className="col s4">
              <span
                id="edit-doc"
                className="fa fa-pencil-square-o card-actions tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip="Edit document"
                onClick={this.editDocument}
              />
            </div>
            <div className="col s4">
              <span
                className="fa fa-file-text card-actions tooltipped"
                data-position="bottom"
                data-tooltip="View document"
                onClick={this.editDocument}
              />
            </div>
            <div className="col s4">
              <span
                className="fa fa-trash card-actions tooltipped"
                data-position="bottom"
                id="delete-doc"
                data-delay="20"
                data-tooltip="Delete document"
                onClick={this.deleteDocument}
              />
            </div>
          </div>
        </div>
      </div>

    );
  }
}


DocumentCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  auth: React.PropTypes.object.isRequired,
  actions: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
DocumentCard.contextTypes = {
  router: PropTypes.object
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});

export default connect(null, mapDispatchToProps)(DocumentCard);
