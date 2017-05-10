import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card.js';
import SearchBar from "./SearchBar.js"
import star from './images/star.svg';
import wars from './images/wars.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: {},
      home: {},
      person: 1
    }

  }
  componentDidMount () {
    axios('http://localhost:3008/people')
    .then(response => {
      this.setState({ people: response.data})
    })
    axios('http://localhost:3008/planets')
    .then(response => {
      this.setState({ home: response.data})
    })
  }
  render() {
    if (this.state.people.length === 0 || this.state.home.length === 0) return <div>Loading...</div>
    return (
      <div className='content'>
        <div className='logo'>
          <img src={star} alt="star-logo" />
          <span className='interview-text'>The Interview</span>
          <img src={wars} alt="wars-logo" />
        </div>
        <SearchBar />
        <Card home={this.state.home} person={this.state.person}/>
      </div>
    );
  }
}

export default App;
