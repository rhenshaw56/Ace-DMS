import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import DocumentSearch from '../search/DocumentSearch';
import UserSearch from '../search/UserSearch';
import { logout } from '../../actions/userActions';


export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    browserHistory.push('/login');
  }
  render() {
    const { isLoggedIn } = this.props.auth;
    let firstName = '';
    if (isLoggedIn) {
      firstName = this.props.auth.user.firstName;
    }
    const showSearch = window.location.pathname !== '/editor';
    return (
      <header>
        <nav>
          <div
            className="nav-wrapper"
            id="left-pad"
          >
            <Link
              className="brand-logo"
              to="/"
            >
             acedms
          </Link>
            <ul
              id="nav-mobile"
              className="right hide-on-med-and-down"
            >{isLoggedIn && showSearch ?
              <li><UserSearch /></li> : ''
            }{isLoggedIn && showSearch ?
              <li><DocumentSearch /></li> : ''
            }
              <li>
                <a href="/api-docs"><i className="fa fa-file-archive-o" aria-hidden="true" /> API Docs</a>
              </li>
              {isLoggedIn ?
                <li>
                  <Link
                    id="firstName"
                    to="/profile"
                    data-tooltip="Manage Profile"

                  >
                    <i className="fa fa-users" aria-hidden="true" /> {firstName.toUpperCase()}
                  </Link></li>
                : ''
              }{!isLoggedIn ?
                <li><Link id="signup-nav" to="/signup" >SIGNUP</Link></li>
              : ''
            }{!isLoggedIn ?
              <li><Link to="/login">LOGIN</Link></li>
              : <li id="logout" onClick={this.logout}>
                <Link>
                  <i className="fa fa-sign-out" aria-hidden="true" /> LOGOUT
                </Link>
              </li>
            }
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
Nav.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};


export default connect(null, { logout })(Nav);

