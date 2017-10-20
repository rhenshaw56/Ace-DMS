import React from 'react';
import { Row } from 'react-materialize';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


class App extends React.Component {
  constructor(props) {
    super(props);
  }
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
  children: React.PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  isLoggedIn: state.rootReducer.auth.isLoggedIn
});

export default connect(mapStateToProps)(App);
