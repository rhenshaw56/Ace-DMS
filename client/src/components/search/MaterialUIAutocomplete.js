import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';
import JSONP from 'jsonp';
import axios from 'axios';

const searchUrl = '/api/search/users?q=';

class MaterialUIAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {
      dataSource: [],
      inputValue: ''
    };
  }
  onUpdateInput(inputValue) {
    this.setState({
      inputValue
    }, function () {
      this.performSearch();
    });
  }
  performSearch() {
    const url = searchUrl + this.state.inputValue;
    if (this.state.inputValue !== '') {
      const searchResults = JSONP(url);
      let retrievedSearchTerms = [];
      retrievedSearchTerms = searchResults.map(result => result[0]);
      this.setState({
        dataSource: retrievedSearchTerms
      });
    }
  }

  onUpdateInput(inputValue) {
    this.setState({
      inputValue
    }, () => {
      this.performSearch();
    });
  }

  render() {
    return (<AutoComplete
      dataSource={this.state.dataSource}
      onUpdateInput={this.onUpdateInput}
    />);
  }
}

export default MaterialUIAutocomplete;
