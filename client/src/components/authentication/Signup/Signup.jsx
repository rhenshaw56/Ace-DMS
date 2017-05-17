import React from 'react';
import { Row, Col } from 'react-materialize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/userActions';
import Form from './Form';
import Nav from '../../Nav'; // eslint-disable-line
import Footer from '../../footer';


/**
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {
  /**
   * @returns {Object} Jsx
   * @memberOf Signup
   */
  render() {
    return (
      <div>
        <Nav
          auth={this.props.auth}
        />
        <div
          className="col s12" id="none"
        >
          <div>
            <Row>
              <Col
                m={3}
              />
              <Col
                m={6}
              >
                <Form
                  signup={this.props.actions.signup}
                />
              </Col>
              <Col
                m={3}
              />
            </Row>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}


Signup.propTypes = {
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
