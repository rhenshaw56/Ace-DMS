import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.forceUpdate();
  }
  render() {
    const { user } = this.props;
    const isAdmin = user.roleId === 1;
    const firstLetter = user.firstName[0].toUpperCase();
    const secondLetter = user.lastName[0].toUpperCase();
    let role = 'Regular-user';
    if (isAdmin) {
      role = 'Admin-user';
    }
    return (
      <div className="col s3 side-nav fixed" id="slide-out">
        <h3 className="brand-logo">acedms</h3>
        <Link
          className="btn-floating btn-large waves-effect waves-light #26a69a"
          data-position="left" data-delay="50"
          data-tooltip="new document"
          to="/editor"
        >
          <i
            className="material-icons"
          >add
          </i>
        </Link>
        <div className="profile-box">
          {isAdmin
          ? <ListItem
            disabled
            leftAvatar={<Avatar>A</Avatar>}
          />
          : <ListItem
            disabled
            leftAvatar={<Avatar>{firstLetter}{secondLetter}</Avatar>}
          />

          }{isAdmin
          ? <p>ROLE: {role} </p>
          : <p>PROFILE</p>
          }{!isAdmin
          ? <p>email: {user.email} </p>
          : ''
          }{!isAdmin
          ? <p>{user.firstName} {user.lastName}</p>
          : ''
          }
        </div>
        <div className="divider" />
        {isAdmin
        ? <ul>
          <li><Link to="/documents">Manage Documents </Link></li>
          <li><Link to="/users">Manage Users</Link></li>
          <li><Link to="/roles">Manage Roles</Link></li>
        </ul>
        : ''
        }
      </div>
    );
  }
}

Sidebar.propTypes = {
  user: React.PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Sidebar);
