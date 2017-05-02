import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loadUserDocument,
  loadAllDocument } from '../../actions/documentActions';
import Nav from '../navbar';
import Footer from '../footer';
import Sidebar from '../Sidebar';
import DocPane from '../Documents/DocPane';



/**
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
  /**
   * Creates an instance of Dashboard.
   * @param {Object} props
   * @memberOf Dashboard
   */
  constructor(props) {
    super(props);
    this.state = {
      isPrivate: false
    };
  }
  /**
   * Hook Method
   * @returns {none} updates state before component mounts
   * @memberOf Dashboard
   */
  componentWillMount() {
    if (this.props.isLoggedIn) {
      if (this.props.auth.roleId === 1) {
        this.props.loadAllDocument().catch((err) => {
          if (err.response.data.status === '404') {
            browserHistory.push('/');
          }
        });
        this.setState({ isPrivate: true });
      } else {
        this.props.loadAllDocument().catch((err) => {
          if (err.response.data.status === '404') {
            browserHistory.push('/');
          }
        });
      }
    }
  }

  /**
   * @returns {Object} Jsx
   * @memberOf Dashboard
   */
  render() {
    return (
      <div>
        <Sidebar
          user={this.props.auth.user}
        />
        <Nav
          auth={this.props.auth}
        />
        <div
          className="col s9 push-s3"
          id="none"
        >
          <div
            className="row"
          >
            <DocPane
              publicDocuments={this.props.publicDocuments}
              privateDocuments={this.props.privateDocuments}
              roleDocuments={this.props.roleDocuments}
              auth={this.props.auth}
              user={this.props.user}
              isLoggedIn={this.props.isLoggedIn}
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }

}
Dashboard.propTypes = {
  publicDocuments: React.PropTypes.array.isRequired,
  privateDocuments: React.PropTypes.array.isRequired,
  roleDocuments: React.PropTypes.array.isRequired,
  loadAllDocument: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const currentState = state.manageDocuments;
  let roleDocuments = [];
  let privateDocuments = [];
  const publicDocuments = currentState.documents.filter(
    doc => doc.access === 'public');
  if (state.auth.isLoggedIn && state.auth.user.roleId !== 1) {
    roleDocuments = currentState.documents.filter(
        doc => doc.access === 'role' && doc.ownerRoleId === state.auth.user.roleId
      );
    privateDocuments = currentState.documents.filter(
          doc => doc.ownerId === state.auth.user.id);
  } else if (state.auth.isLoggedIn && state.auth.user.roleId === 1) {
    roleDocuments = currentState.documents.filter(
        doc => doc.access === 'role');
    privateDocuments = currentState.documents.filter(
          doc => doc.access === 'private');
  }
  return {
    publicDocuments,
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    roleDocuments,
    privateDocuments,
    auth: state.auth,
    documentDetails: currentState.documentDetails
  };
};
export default connect(mapStateToProps,
    { loadUserDocument, loadAllDocument })(Dashboard);
