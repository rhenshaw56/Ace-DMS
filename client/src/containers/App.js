import React from 'react';
import { Row, Col } from 'react-materialize';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import '../style/main.scss';


class App extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <div className="content">
            {this.props.children}
          </div>
        </Row>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node.isRequired,
  auth: React.PropTypes.object.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);
