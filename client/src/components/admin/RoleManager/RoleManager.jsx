import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'react-materialize';
import { loadRoles } from '../../../actions/roleActions';
import Nav from '../../navbar';
import RoleContainer from './RoleContainer';


/**
 * @class RoleManager
 * @extends {React.Component}
 */
class RoleManager extends React.Component {
    /**
   * Hook Method
   * @returns {none} none
   * @memberOf RoleManager
   */
  componentWillMount() {
    if (this.props.user.roleId === 1) {
      this.props.loadRoles();
    } else {
      localStorage.removeItem('jwtToken');
      browserHistory.push('/login');
    }
  }
  /**
   * @returns {Object} Jsx
   * @memberOf RoleManager
   */
  render() {
    return (
      <div>
        <Nav auth={this.props.auth} />
        <div>
          <Row>
            <Col m={1} />
            <Col m={10}>

              <RoleContainer data={this.props.roles} />
              <a
                className="btn-floating btn-large waves-effect waves-light red"
              ><i
                className="material-icons"
                data-tool-tip="add new role"
              >add</i>
              </a>
            </Col>
            <Col m={1} />
          </Row>
        </div>
      </div>
    );
  }
}
RoleManager.propTypes = {
  user: React.PropTypes.object.isRequired,
  loadRoles: React.PropTypes.func.isRequired,
  roles: React.PropTypes.array.isRequired,
  auth: React.PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  roles: state.manageRoles.roles
});

export default connect(mapStateToProps,
      { loadRoles })(RoleManager);
