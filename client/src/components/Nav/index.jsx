import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import DocumentSearch from '../search/DocumentSearch'; //eslint-disable-line
import UserSearch from '../search/UserSearch';  //eslint-disable-line
import { logout } from '../../actions/userActions';


/**
 * Class Nav represents Nav-header component
 * @export
 * @class Nav
 * @extends {React.Component}
 */
export class Nav extends React.Component {
  /**
   * Creates an instance of Nav.
   * @param {Object} props
   * @memberof Nav
   */
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'documents'
    };
    this.logout = this.logout.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

    /**
   * Funtion to handle change on Select button
   * @param {Object} event - browser keyboard input event
   * @returns {None} none
   * @memberof Editor
   */
  handleSelect(event) {
    this.setState({ searchType: event.target.value });
  }

  /**
   * Function to handle user logouts
   * @param {Object} e (events) - click events
   * @returns {None} none
   * @memberof Nav
   */
  logout(e) {
    e.preventDefault();
    this.props.logout();
    browserHistory.push('/login');
  }
  /**
   * render function for Nav component
   * @returns {Object} Jsx Object
   * @memberof Nav
   */
  render() {
    const { searchType } = this.state;
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
              <li>
                <select
                  atyle={{ display: 'block' }}
                  id="search-type"
                  value={this.state.searchType}
                  onChange={this.handleSelect}
                >
                  <option
                    value="documents"
                  >Documents</option>
                  <option
                    value="users"
                  >Users</option>
                </select>
              </li> : ''
            }{isLoggedIn && showSearch && searchType === 'documents' ?
              <li><DocumentSearch /></li> : ''
            }{isLoggedIn && showSearch && searchType === 'users' ?
              <li><UserSearch /></li> : ''
            }
              <li>
                <a
                  href="/api-docs"
                >
                  <i className="fa fa-file-archive-o" aria-hidden="true" />
                  API Docs
                </a>
              </li>
              {isLoggedIn ?
                <li>
                  <Link
                    id="firstName"
                    to="/profile"
                    data-tooltip="Manage Profile"

                  >
                    <i
                      className="fa fa-users" aria-hidden="true"
                    /> {firstName.toUpperCase()}
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

