import React from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { login } from '../../actions/userActions';
import Nav from '../../components/navbar';
import Footer from '../../components/footer';

/**
 * @class Signin
 * @extends {React.Component}
 */
export class Signin extends React.Component {
  /**
   * Creates an instance of Signin.
   * @param {any} props
   * @memberOf Signin
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @param {e} e: browser event
   * @memberOf Signin
   * @returns {none} handles form onSubmit event
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }
  /**
   * @param {e} e: browser event
   * @memberOf Signin
   * @returns {none} handles form onChange event
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   * @returns {Object} Jsx
   * @memberOf Signin
   */
  render() {
    return (
      <div>
        <Nav
          auth={this.props.auth}
        />
        <div
          className="col s12"
          id="none"
        >
          <div
            className="content"
          >
            <Row>
              <Col
                m={3}
              />
              <Col
                m={6}
              >
                <div
                  className="container"
                >
                  <form>
                    <h3>SIGN IN</h3>
                    <Input
                      id="email-login"
                      name="email"
                      type="email"
                      label="Email"
                      icon="email"
                      s={12}
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                    <Input
                      name="password"
                      type="password"
                      label="Password"
                      icon="lock"
                      s={12}
                      onChange={this.onChange}
                      value={this.state.password}
                    />
                    <p>
                      <Button
                        type="submit"
                        value="Sign In"
                        onClick={this.onSubmit}
                      >SIGN IN</Button>
                    </p>
                  </form>
                </div>
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
Signin.contextTypes = {
  router: React.PropTypes.object
};
Signin.propTypes = {
  login: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  user: state.auth.user,
  auth: state.auth,
});
export default connect(mapStateToProps, { login })(Signin);
