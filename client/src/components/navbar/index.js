import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import Search from '../search';
import { logout } from '../../actions/userActions';


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.handleSearchModal = this.handleSearchModal.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    browserHistory.push('/login');
  }
  handleSearchModal(event) {
    event.preventDefault();
    $('#modal2').modal('open');
  }
  render() {
    const { isLoggedIn } = this.props.auth;
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
            >{isLoggedIn ?
              <li id="searchClick">
                <a
                  onClick={this.handleSearchModal} className="tooltipped"
                  data-position="left" data-delay="50"
                  data-tooltip="search"
                >
                  <i className="material-icons">search</i></a>
              </li> : ''

            }{!isLoggedIn ?
              <li><Link to="/signup" >SIGNUP</Link></li>
              : ''
            }{!isLoggedIn ?
              <li><Link to="/login">LOGIN</Link></li>
              : <li><a onClick={this.logout}>LOGOUT</a></li>
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

