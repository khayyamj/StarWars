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
    this.limitLoading = this.limitLoading.bind(this);
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

      return this.state.people
      .filter(person => {
        console.log('filter: ', `${person.name}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
        return (`${person.name}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
      })
      .map(person => {
      let home = this.state.home
      let planetIndex = person.homeworld;
      let planet = home.filter( (planet) => {
        return planet.id === planetIndex;
      });
      let homePlanet = planet[0].name;
      return (
        <div>
          <Card home={homePlanet} person={person} key={person.id}/>
        </div>
      )
    })
  }
  handleSearchChange (event) {
    this.setState({ searchTerm: event.target.value })
  }
  limitLoading (lower, upper) {
    axios(`http://localhost:3008/people?_start=${lower}&_end=${upper}`)
    .then(response => this.setState({ people: response.data }))
  }
  render() {
    return (
      <div className='content'>
        <div className='logo'>
          <img src={star} alt="star-logo" />
          <span className='interview-text'>The Interview</span>
          <img src={wars} alt="wars-logo" />
        </div>
        <div>
          <h3>
            <a onClick={() => this.limitLoading(0, 9)}>1 - 10</a>
          </h3>
          <h3>
            <a onClick={() => this.limitLoading(10, 19)}>11 - 20</a>
          </h3>
          <h3>
            <a onClick={() => this.limitLoading(20, 29)}>21 - 30</a>
          </h3>
          <h3>
            <a onClick={() => this.limitLoading(30, 39)}>31 - 40</a>
          </h3>
          <h3>
            <a onClick={() => this.limitLoading(40, 49)}>41 -50</a>
          </h3>
          <h3>
            <a onClick={() => this.limitLoading(50, 59)}>51 - 60</a>
          </h3>
          <h3>
            <a onClick={() => this.limitLoading(60, 69)}>61 - 70</a>
          </h3>
          <h3>
            <a onClick={() => this.limitLoading(70, 79)}>71 - 80</a>
          </h3>
          <h3>
            <a onClick={() => this.limitLoading(80, 82)}>81 - 83</a>
          </h3>
        </div>
        <SearchBar
          onChange={this.handleSearchChange}
          value={this.state.searchTerm}/>
          {this.state.searchTerm}
        {this.renderPeople()}
      </div>
    );
  }
}

export default App;
