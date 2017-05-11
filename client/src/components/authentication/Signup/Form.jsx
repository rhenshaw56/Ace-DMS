import React from 'react';
import { Input, Button } from 'react-materialize';
import { Link } from 'react-router';
import toastr from 'toastr';


/**
 * @class Form
 * @extends {React.Component}
 */
class Form extends React.Component {
  /**
   * Creates an instance of Form.
   * @param {Object} props
   * @memberOf Form
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {any} e: browser event
   * @memberOf Form
   * @returns {none} Updates state
   */
  onChange(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  }


  /**
   * @param {any} e: browser event
   * @memberOf Form
   * @returns {none} handles form onChange event
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state.user)
    .then(() => {
      toastr.success(`Welcome, ${this.state.user.firstName}!`);
      this.context.router.push('/');
    }).catch(() => {
      toastr.error(
        '* INVALID USER DETAILS!'
      );
    });
  }

  /**
   * @returns {Object} Jsx
   * @memberOf Form
   */
  render() {
    return (
      <div
        className="container login-form"
      >
        <form>
          <h3> SIGN UP</h3>
          <Input
            id="firstName"
            type="text"
            onChange={this.onChange}
            name="firstName"
            icon="person_outline"
            label="FirstName"
            value={this.state.user.firstName}
            s={12}
          />
          <Input
            id="lastname"
            type="text"
            onChange={this.onChange}
            name="lastName"
            icon="person"
            label="Lastname"
            value={this.state.user.lastName}
            s={12}
          />
          <Input
            id="email"
            onChange={this.onChange}
            name="email"
            type="email"
            icon="email"
            label="Email"
            value={this.state.user.email}
            s={12}
          />
          <Input
            id="password"
            type="password"
            onChange={this.onChange}
            name="password"
            value={this.state.user.password}
            icon="lock"
            label="Password"
            s={12}
          />
          <Button
            type="submit"
            value="Sign In"
            onClick={this.onSubmit}
          >REGISTER
          </Button>
          <div
            className="input-field col s12"
          >
            <p
              className="margin center medium-small sign-up"
            >
                Already have an account?
                <Link
                  to="/login"
                >
                  Login
                </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

Form.contextTypes = {
  router: React.PropTypes.object
};

Form.propTypes = {
  signup: React.PropTypes.func.isRequired
};
export default Form;
