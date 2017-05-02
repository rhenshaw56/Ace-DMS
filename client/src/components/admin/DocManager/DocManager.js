import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'react-materialize';
import { loadAllDocument } from '../../../actions/documentActions';
import Nav from '../../navbar';
import Container from './Container';


/**
 * @class DocManager
 * @extends {React.Component}
 */
class DocManager extends React.Component {
    /**
   * Hook Method
   * @returns {none} none
   * @memberOf Dashboard
   */
  componentWillMount() {
    if (this.props.user.roleId === 1) {
      this.props.loadAllDocument().catch((err) => {
        browserHistory.push('/');
      });
    } else {
      localStorage.removeItem('jwtToken');
      browserHistory.push('/login');
    }
  }
  /**
   * @returns {Object} Jsx
   * @memberOf DocManager
   */
  render() {
    return (
      <div>
        <Nav auth={this.props.auth} />
        <div>
          <Row>
            <Col m={1} />
            <Col m={10}>
              <Container data={this.props.docs} />
            </Col>
            <Col m={1} />
          </Row>
        </div>
      </div>
    );
  }
}
DocManager.propTypes = {
  user: React.PropTypes.object.isRequired,
  loadAllDocument: React.PropTypes.func.isRequired,
  docs: React.PropTypes.array.isRequired,
  auth: React.PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
  docs: state.manageDocuments.documents
});

export default connect(mapStateToProps,
      { loadAllDocument })(DocManager);
