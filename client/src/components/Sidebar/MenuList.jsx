import React from 'react';
import { Link } from 'react-router';
// import MobileTearSheet from '../../../MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import { blue500, yellow600 } from 'material-ui/styles/colors';

class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };
  render() {
    const { isAdmin, user } = this.props;
    return (
      <div className="ace-menu">
        <Divider />
        {isAdmin ?
          <List className="side">
            <ListItem leftIcon={<ContentInbox />} >{this.props.role}</ListItem>
            <ListItem leftIcon={<ContentInbox />}>{user.email}</ListItem>
          </List>
          :
          <List>
            <ListItem className="side" leftIcon={<ActionGrade />} >{this.props.role}</ListItem>
            <ListItem leftIcon={<ActionGrade />}>{user.email}</ListItem>
            <ListItem leftIcon={<ActionGrade />}>{user.firstName} {user.lastName}</ListItem>
          </List>
        }
        <Divider />
        {isAdmin ?
          <List className="side">
            <ListItem leftIcon={<ContentInbox />}><Link to="/documents">Manage Documents </Link></ListItem>
            <ListItem leftIcon={<ActionGrade />}><Link to="/users">Manage Users </Link></ListItem>
            <ListItem leftIcon={<ContentSend />}><Link to="/roles">Manage Roles </Link></ListItem>
            <ListItem leftIcon={<ContentSend />}><Link to="/privateDocs">My Docs</Link></ListItem>
            <ListItem leftIcon={<ContentSend />}><Link to="/">Public Docs</Link></ListItem>
            <ListItem leftIcon={<ContentSend />}><Link to="/roleDocs">Role Docs</Link></ListItem>
          </List>
          :
          <List className="special-icon">
            <ListItem leftIcon={<ContentInbox />}><Link to="/profile">Profile </Link></ListItem>
            <ListItem
              primaryText="Documents"
              leftIcon={<ContentInbox />}
              nestedItems={[
                <ListItem
                  key={1}
                  leftIcon={<ActionGrade />}
                ><Link to="/privateDocs">My Docs</Link></ListItem>,
                <ListItem
                  key={2}
                  leftIcon={<ContentSend />}
                ><Link to="/">Public Docs</Link></ListItem>,
                <ListItem
                  key={3}
                  leftIcon={<ContentSend />}
                ><Link to="/roleDocs">Role Docs</Link></ListItem>
              ]}
            /></List>
        }
        <Divider />

      </div>
    );
  }

}

MenuList.propTypes = {
  isAdmin: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired,
  role: React.PropTypes.string.isRequired
};
export default MenuList;
