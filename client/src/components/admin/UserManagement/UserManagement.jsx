import React from 'react';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'react-materialize';
import { initUsers } from '../../../actions/userActions';
import Nav from '../../navbar';
import Container from './Container';


class UserManagement extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (this.props.user.roleId === 1) {
      this.props.initUsers().catch((err) => {
        browserHistory.push('/');
      });
    } else {
      localStorage.removeItem('jwtToken');
      browserHistory.push('/login');
    }
  }
  render() {
    return (
      <div>
        <Nav auth={this.props.auth} />
        <div>
          <Row>
            <Col m={1} />
            <Col m={10}>
              <Container data={this.props.users} />
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
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
  users: state.manageUsers.allUsers
});

export default connect(mapStateToProps,
    { initUsers })(UserManagement);
