import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router';
import './App.css';
import Card from './Card.js';
import SearchBar from "./SearchBar.js"
import star from './images/star.svg';
import wars from './images/wars.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
      home: [{
        id: 1,
        name: 'Tatooine'
      }],
      person: [{
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        image: 'luke_skywalker.jpg',
        id: 1,
        planet: 'Tatooine'
      }],
      searchTerm: ''
    }
    this.renderPeople = this.renderPeople.bind(this);
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
  renderPeople () {
    return this.state.people.map(person => {
      let home = this.state.home
      let planetIndex = person.homeworld;
      let planet = home.filter( (planet) => {
        return planet.id === planetIndex;
      });
      let homePlanet = planet[0].name;
      return (
        <div>
          <Card home={homePlanet} person={person} />
        </div>
      )
    })
  }
  handleSearchChange (event) {
    this.setState({ searchTerm: event.target.value })
  }
  render() {
    return (
      <div className='content'>
        <div className='logo'>
          <img src={star} alt="star-logo" />
          <span className='interview-text'>The Interview</span>
          <img src={wars} alt="wars-logo" />
        </div>
        <SearchBar onChange={this.handleSearchChange} value={this.state.searchTerm}/>
        {this.renderPeople()}
      </div>
    );
  }
}

export default App;
