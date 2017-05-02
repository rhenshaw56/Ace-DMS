import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { Modal, Button, Row } from 'react-materialize';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';

class DocCard extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.editDocument = this.editDocument.bind(this);
  }
  editDocument(e) {
    e.preventDefault();
    if (this.props.ownerId === this.props.auth.user.id || this.props.auth.user.roleId === 1) {
      const formattedDocument = {
        title: this.props.title,
        content: this.props.content,
        acces: this.props.role,
        id: this.props.id
      };
      this.props.actions.editDocument(formattedDocument);
      this.context.router.push('/editor');
    } else {
      toastr.error(
               `You currently do not have edit access ${this.props.title}`
        );
    }
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
      <div className="docs">
        <div className="doc-icon-action-wrapper">
          <div
            className="docs-icon"

          >
            <i className=" large material-icons files">description</i>
          </div>
          <div className="doc-card-action-container">
            <div className="doc-card-action-helper" />
            <div className="doc-card-actions">
              <span
                className="fa fa-trash card-actions tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip="Delete document"
                onClick={this.deleteDocument}
              />
              <span
                className="fa fa-pencil card-actions tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip="Edit document"
                onClick={this.editDocument}
              />
              <Modal
                header={this.props.title}
                body={this.props.content}
                actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>]}
                trigger={
                  <span
                    className="fa fa-eye card-actions tooltipped"
                    data-position="bottom"
                    data-delay="20"
                    data-tooltip="View document"
                  />
              }
              >
                <Row>
                  <div className="input-field col s4">
                    {viewStatus ?
                      <h4>{this.props.content}</h4>
                      :
                      <p>You currently do not have the Access to view this Doc</p>
                    }
                  </div>
                </Row>
              </Modal>
            </div>
          </div>
          <div
            className="doc-card-info chips tooltipped"
            data-position="bottom"
            data-delay="20"
            data-tooltip="my doc"
          >
            <span>{this.props.title}</span>
          </div>
        </div>
      </div>

    );
  }
}


DocCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  deleteDocumentById: PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  actions: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired
};
DocCard.contextTypes = {
  router: PropTypes.object
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});

export default connect(null, mapDispatchToProps)(DocCard);
