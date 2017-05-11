import React, { Component, PropTypes } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions';
import Nav from '../navbar';


export class Editor extends Component {
  constructor(props) {
    super(props);
    const currentMode = this.props.editMode || false;

    this.state = !currentMode ?
    {
      title: '',
      content: '',
      access: ''
    } :
    {
      title: this.props.title,
      content: this.props.content,
      access: this.props.access,
      id: this.props.id
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount() {
    $(() => {
      Materialize.updateTextFields();
    });
  }
  handleClose(e) {
    e.preventDefault();
    browserHistory.push('/');
  }

  handleEditorChange(e) {
    this.setState(
      {
        content: e.target.getContent()
                        .replace(/<p*[^>]*>/g, '')
      }
    );
  }
  handleTextChange(e) {
    const value = e.target.value;
    const field = e.target.name;
    this.setState({ [field]: value });
  }

  handleSelect(event) {
    this.setState({ access: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, content, access } = this.state;
    const data = {
      title,
      content,
      access,
    };
    this.props.actions.saveDocument(data)
    .then(() => {
      toastr.success('Document saved succesfully');
    }).catch(() => {
      toastr.error('Document could not be saved! Try again');
    });
  }
  handleUpdate(e) {
    e.preventDefault();
    if (this.props.ownerId === this.props.auth.user.id ||
          this.props.auth.user.roleId === 1) {
      const { title, content, id, access } = this.state;
      const data = {
        title,
        content,
        access,
        id
      };
      this.props.actions.updateDocument(data)
      .then(() => {
        toastr.success('Document updated succesfully');
      }).catch(() => toastr.error('Document could not be updated!'));
    } else {
      toastr.error(
               `You currently do not have edit access ${this.props.title}`
        );
    }
  }

  render() {
    const { editMode } = this.props;
    let authorFullName;
    if (editMode) {
      const { users } = this.props;
      if (this.props.ownerId <= 2) {
        authorFullName = 'ADMIN';
      } else {
        const author = users.filter(user => user.id === this.props.ownerId);
        authorFullName = `  ${author[0].firstName.toUpperCase()} ${author[0].lastName.toUpperCase()}`;
      }
    }
    return (
      <div>
        <Nav auth={this.props.auth} />
        <Row>
          {editMode ?
            <Input
              className="editor-title"
              s={4}
              id="edt-title"
              name="title"
              validate icon="subtitles"
              value={this.props.title}
              onChange={this.handleTextChange}
            /> :
            <Input
              id="doc-title"
              s={4}
              name="title"
              label="Document Title"
              validate icon="subtitles"
              value={this.state.title}
              onChange={this.handleTextChange}
            />
            }{editMode ?
              <div
                className="input-field col s4"
              >
                <select
                  style={{ display: 'block' }}
                  id="access"
                  value={this.props.access}
                  onChange={this.handleSelect}
                >
                  <option
                    value="0"
                    disabled
                  >
                  Select Access
                </option>
                  <option
                    value="private"
                    disabled
                  >
                  Private
                </option>
                  <option
                    value="public"
                    disabled
                  >
                  Public
                </option>
                  <option
                    value="role"
                    disabled
                  >
                  Role
                </option>
                </select>
              </div> :
              <div
                className="input-field col s4"
              >
                <select
                  style={{ display: 'block' }}
                  id="access"
                  value={this.state.access}
                  onChange={this.handleSelect}
                >
                  <option
                    value="0"
                    disabled
                  >
                  Select Access
                </option>
                  <option
                    value="private"
                  >
                  Private
                </option>
                  <option
                    value="public"
                  >
                  Public
                </option>
                  <option
                    value="role"
                  >
                  Role
                </option>
                </select>
              </div>
            }{editMode ?
              <div
                className="col s4"
              >
                <p>Author: {authorFullName}</p>
                <p>Created At : {this.props.date.substr(0, 10)}</p>
              </div> : ''
            }
        </Row>
        {editMode ?
          <TinyMCE
            id="tiny"
            content={this.props.content}
            onChange={this.handleEditorChange}
            placeholder="feel free to place new content here"
            config={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
          /> :
          <TinyMCE
            id="tiny"
            content=""
            onChange={this.handleEditorChange}
            placeholder="feel free to place new content here"
            config={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
          />
        }
        <Button
          id="cancel"
          className="btn-cancel"
          waves="light"
          modal="close"
          flat
          onClick={this.handleClose}
        >
            Close
         </Button>
        {editMode ?
          <Button
            id="save"
            waves="light"
            flat
            className="btn-save"
            onClick={this.handleUpdate}
          >
            Save
          </Button> :
          <Button
            id="save"
            waves="light"
            flat
            className="btn-save"
            onClick={this.handleSubmit}
          >
            Save
          </Button>
         }
      </div>
    );
  }
}

Editor.contextTypes = {
  router: React.PropTypes.object
};

Editor.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  actions: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  ownerId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  const document = state.manageDocuments.document;
  const editMode = state.manageDocuments.editMode;
  if (editMode) {
    return {
      user: state.auth.user,
      auth: state.auth,
      editMode: state.manageDocuments.editMode,
      content: document.content,
      access: document.access,
      title: document.title,
      id: document.id,
      ownerId: document.ownerId,
      date: document.date,
      users: state.manageSearch.searchList
    };
  }
  return {
    user: state.auth.user,
    auth: state.auth,
    editMode: state.manageDocuments.editMode,
    users: state.manageSearch.searchList
  };
};


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Editor);

