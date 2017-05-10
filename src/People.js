import React, { Component } from 'react'
import Card from './Card';

class People extends Component {
  renderPeople () {
    this.props.people.map(person => {
      console.log(person);
      let planet = home[indexOf(person.homeworld)];
      console.log('planet = ', planet)
      return (
        <Card home={this.state.home} person={this.state.person}/>
      )
    })
  }
  render () {
    const { person, home } = this.props;
    return (
      <div>
        {renderPeople}
      </div>
    )
  }
}
