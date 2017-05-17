import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';

/**
 * Class for Document cards
 * @export
 * @class DocumentCard
 * @extends {React.Component}
 */
export class DocumentCard extends React.Component {
  /**
   * Creates an instance of DocumentCard.
   * @param {Object} props
   * @memberof DocumentCard
   */
  constructor(props) {
    super(props);
    // this.deleteDocument = this.deleteDocument.bind(this);
    this.editDocument = this.editDocument.bind(this);
  }
  /**
   * Function to handle editting of documents
   * @param {Object} e - browser click event
   * @returns {None} none
   * @memberof DocumentCard
   */
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
    /**
   * Function to handle deletion of documents
   * @param {Number} id - document id
   * @param {Funtion} callback
   * @returns {None} none
   * @memberof DocumentCard
   */
  deleteDocument(id, callback) {
    if (this.props.ownerId === this.props.auth.user.id
          || this.props.auth.user.roleId === 1) {
          swal({  //eslint-disable-line
            title: 'Are you sure?',
            text: 'This Document will be totally deleted!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#26a69a',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: true
          },
      () => {
        callback(id);
      });
    } else {
      swal({ //eslint-disable-line
        title: 'Sorry!',
        text: `You dont have the access rights
               required to delete ${this.props.title}`,
        type: 'warning',
        showConfirmButton: true
      });
    }
  }
  /**
   * Render function to render the Component
   * @returns {Object} jsx Object
   * @memberof DocumentCard
   */
  render() {
    return (
      <div className="row">
        <div className="card ace-card">
          <div className="card-content">
            <span className="card-title doc-title">{this.props.title}</span>
            <p>{this.props.content.slice(0, 15)}...</p>
          </div>
          <div className="card-action row">
            <div className="col s4">
              <span   // eslint-disable-line
                id="edit-doc"
                className="fa fa-pencil-square-o card-actions tooltipped ace-icon" // eslint-disable-line
                data-position="bottom"
                data-tooltip="Edit document"
                onClick={this.editDocument}
              />
            </div>
            <div className="col s4">
              <span   // eslint-disable-line
                className=""
                data-position="bottom"
                data-tooltip="View document"
                onClick={this.editDocument}
              />
            </div>
            <div className="col s4">
              <span   // eslint-disable-line
                className="fa fa-trash card-actions tooltipped ace-icon"
                data-position="bottom"
                id="delete-doc"
                data-delay="20"
                data-tooltip="Delete document"
                onClick={
                  () => {
                    this.deleteDocument(
                        this.props.id,
                        this.props.actions.deleteDocumentById
                    );
                  }
              }
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
