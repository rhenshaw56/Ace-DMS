import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'react-materialize';
import { initUsers } from '../../../actions/userActions';
import Nav from '../../Nav'; //eslint-disable-line
import UserContainer from './UserContainer';


/**
 * Class to handle UserManagement component
 * @class UserManagement
 * @extends {React.Component}
 */
class UserManagement extends React.Component {
  /**
   * Creates an instance of UserManagement.
   * @param {Object} props
   * @memberof UserManagement
   */
  constructor(props) { //eslint-disable-line
    super(props);
  }

      /**
   * Hook Method
   * @returns {none} none
   * @memberOf UserManagement
   */
  componentWillMount() {
    if (this.props.user.roleId === 1) {
      this.props.initUsers().catch(() => {
        browserHistory.push('/');
      });
    } else {
      localStorage.removeItem('jwtToken');
      browserHistory.push('/login');
    }
  }

    /**
   * @returns {Object} Jsx
   * @memberOf UseManagement
   */
  render() {
    return (
      <div>
        <Nav auth={this.props.auth} />
        <div>
          <Row>
            <Col m={1} />
            <Col m={10}>
              <UserContainer data={this.props.users} />
            </Col>
            <Col m={1} />
          </Row>
        </div>
      </div>
    );
  }
}
UserManagement.propTypes = {
  user: React.PropTypes.object.isRequired,
  initUsers: React.PropTypes.func.isRequired,
  users: React.PropTypes.array.isRequired,
  auth: React.PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  users: state.manageUsers.allUsers
});

export default connect(mapStateToProps,
    { initUsers })(UserManagement);
