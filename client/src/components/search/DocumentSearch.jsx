import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';

/**
 * Search Component Class for searching documents
 * @export
 * @class Search
 * @extends {Component}
 */
export class DocumentSearch extends Component {
  /**
   * Creates an instance of DocumentSearch.
   * @param {any} props
   * @memberof DocumentSearch
   */
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.state = {
      dataSource: [],
      inputValue: ''
    };
  }
  /**
   * Function to watch for Updates on Search Input
   * @returns {none} none
   * @param {any} inputValue
   * @memberof Search
   */
  onUpdateInput(inputValue) {
    this.setState({
      inputValue
    }, () => {
      this.performSearch();
    });
  }
  /**
   * Function to Open the Editor after selecting a document
   * @param {none} none
   * @returns {none} none
   * @memberof Search
   */
  openEditor() {
    const selectedDoc = this.state.inputValue;
    console.log(selectedDoc);
    const mappedDoc = this.mapDocument(selectedDoc);
    const formattedDoc = this.formatDocument(mappedDoc);
    this.props.actions.editDocument(formattedDoc);
    this.context.router.push('/editor');
  }

  /**
   * Function to map found document title to its details
   * @param {String} title
   * @returns {Object} first index of mappedDocument
   * @memberof Search
   */
  mapDocument(title) {
    const { availableDocs } = this.props;
    const mappedDocument = availableDocs.filter(doc => doc.title === title);
    return mappedDocument[0];
  }
  /**
   * Function to format documents before opening the editor
   * @param {Object} document
   * @returns {Object} formattedDocument
   * @memberof Search
   */
  formatDocument(document) {
    console.log(document);
    return {
      title: document.title,
      content: document.content,
      access: document.access,
      id: document.id,
      ownerId: document.ownerId,
      ownerRoleId: document.ownerRoleId,
      date: document.createdAt
    };
  }

  /**
   * Function to handle searching of documents
   * @param {none} none
   * @returns {none} none
   * @memberof Search
   */
  performSearch() {
    const { availableDocs } = this.props;
    const docs = availableDocs.map(doc => doc.title);
    this.setState({
      dataSource: docs
    });
  }

  /**
   * Function that renders Component into its parent
   * @param {none} none
   * @returns {Object} Jsx Object
   * @memberof Search
   */
  render() {
    return (
      <AutoComplete
        id="search-doc"
        hintText="Search documents"
        dataSource={this.state.dataSource}
        onUpdateInput={this.onUpdateInput}
        onNewRequest={this.openEditor}
        maxSearchResults={15}
        filter={AutoComplete.caseInsensitiveFilter}
      />
    );
  }
}
DocumentSearch.propTypes = {
  availableDocs: React.PropTypes.array.isRequired,
  actions: React.PropTypes.func.isRequired,
};
DocumentSearch.contextTypes = {
  router: React.PropTypes.object
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});

const mapStateToProps = (state) => {
  const allDocuments = state.manageDocuments.documents;
  const currentUser = state.auth.user;
  let availableDocs;
  if (currentUser.roleId !== 1) {
    availableDocs = allDocuments.filter(
      doc => doc.access === 'public' ||
      doc.ownerId === currentUser.id ||
      doc.ownerRoleId === currentUser.roleId
    );
  } else {
    availableDocs = allDocuments;
  }
  return {
    availableDocs
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentSearch);
