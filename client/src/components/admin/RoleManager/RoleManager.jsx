import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Modal, Button } from 'react-materialize';
import { loadRoles, saveRole } from '../../../actions/roleActions';
import Nav from '../../navbar';
import RoleContainer from './RoleContainer';


/**
 * @class RoleManager
 * @extends {React.Component}
 */
class RoleManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: {}
    };
    this.onChange = this.onChange.bind(this);
    this.createRole = this.createRole.bind(this);
  }
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
  onChange(e) {
    const title = e.target.name;
    const role = this.state.role;
    role[title] = e.target.value;
    this.setState({ role });
  }
  createRole(e) {
    e.preventDefault();
    const currentRoles = this.props.roles.map(role => role.title);
    const newRole = this.state.role.title;
    if (currentRoles.includes(newRole)) {
      swal({  //eslint-disable-line
        title: 'Invalid Operation',
        text: 'This Role already exist',
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Undo',
        closeOnConfirm: true
      });
    } else if (newRole === undefined) {
        swal({  //eslint-disable-line
          title: 'Invalid Operation',
          text: 'Please Enter a role title',
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Undo',
          closeOnConfirm: true
        });
    } else {
      this.props.saveRole(this.state.role)
      .then(() => {
          swal( //eslint-disable-line
            'Nice',
            'Role saved succefully',
            'success'
          );
      })
      .catch(() => {
          swal({  //eslint-disable-line
            title: 'Invalid Operation',
            text: 'Please Enter a valid role title',
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Undo',
            closeOnConfirm: true
          });
      });
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
              <Modal
                actions={
                [
                  <Button
                    style={{ marginLeft: `${2}em` }}
                    className="btn-save"
                    waves="light"
                    modal="close"
                    flat
                  >Close
                  </Button>,
                  <Button
                    id="save-role"
                    waves="light"
                    flat
                    className="btn-save"
                    onClick={this.createRole}
                  >Save
                  </Button>
                ]
                            }
                trigger={<a
                  className="btn-floating btn-large waves-effect waves-light red"
                ><i
                  className="material-icons"
                  data-tool-tip="add new role"
                >add</i>
                </a>}
              >
                <Row>
                  <div className="col s8 push-s2">
                    <div>
                      <label htmlFor="newRole">New Role Title</label>
                      <input
                        id="role"
                        type="text"
                        icon="person_otline"
                        placeholder="Add a role title here"
                        onChange={this.onChange}
                        name="title"
                        value={this.state.role.title}
                      />
                    </div>
                  </div>
                </Row>
              </Modal>
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
  auth: React.PropTypes.object.isRequired,
  saveRole: React.PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  roles: state.manageRoles.roles
});

export default connect(mapStateToProps,
      { loadRoles, saveRole })(RoleManager);
