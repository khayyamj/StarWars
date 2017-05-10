import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  render() {
    return (
      <form className='search-bar' onSubmit={this.props.submit}>
        <input placeholder='Search Your Destiny' value={this.props.value} onChange={this.props.change} type='text'/>
      </form>
    );
  }
}

export default SearchBar;
