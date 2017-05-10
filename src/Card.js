import React, { Component } from 'react';
import './Card.css';

let editForm='';

class Card extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      name: this.props.person.name,
      birthday: this.props.person.birth_year,
      url: this.props.person.image,
      planet: this.props.home,
      favorites: []
    };
    this.planetOptions = this.planetOptions.bind(this);
  }
  editName (event) {
    let name = event.target.value;
    this.setState({ name: name })
  }
  editBirth (event) {
    this.setState({ birthday: event.target.value })
  }
  editUrl (event) {
    this.setState({ url: event.target.value })
  }
  editPlanet (event) {
    this.setState({ planet: event.target.planet })
  }
  planetOptions () {
    return this.props.planets.map(planet => {
      return (
        <option value={planet.id} key={planet.id}>{planet.name}</option>
      )
    })
  }
  displayEditform () {
    this.setState({ visible: !this.state.visible});
    if (this.state.visible) {
      editForm = (<form onSubmit={this.handleFormSubmit}>
        <h2>Update:</h2>
        <input placeholder={this.state.name} name='name' onChange={this.editName.bind(this)} value={this.state.name} />
        <input placeholder={this.state.birthday} name='birth_year' onChange={this.editBirth.bind(this)} value={this.state.birthday} />
        <input placeholder={this.url} name='url' onChange={this.editUrl.bind(this)} value={this.state.url} />
        <select name='planet' value={this.state.planet} onChange={this.editPlanet.bind(this)}>
          {this.planetOptions()}
        </select>
        <button type='submit' value='submit'>Submit</button>
      </form>)
    } else {
      editForm = '';
    }
  }
  handleFormSubmit (event) {
    event.preventDefault();
    console.log('form submit ->', this.state.name, this.state.birthday, this.state.url)
    let updateObj = {
      name: this.state.name,
      birthday: this.state.birthday,
      url: this.state.url,
      id: this.props.person.id
    }
    this.props.updateProfile(updateObj);
  }
  addToFavorites (id) {
    let favorites = [...this.state.favorites];
    console.log('add ->', id)
    // let id = event.target.value;
    favorites.push(id);
    console.log('favorites array: ', favorites)
    if (favorites.filter(fav => fav === id).length > 1) {
      while (favorites.filter(fav => fav === id).length > 0) {
        favorites.splice(favorites.indexOf(id), 1);
      }
    }
    this.setState({ favorites: favorites });
  }
  render() {
    const { person, home } = this.props;
    return (
      <div className='card'>
        <div className='card-content'>
            <div className="card-favorite">
              <a>Favorite
                <span onClick={() => this.addToFavorites(person.id)}>
                  [{this.state.favorites.filter(fav => fav === person.id).length === 1 ? 'X' : ''}]
                </span>
              </a>
            </div>
          	<div className='card-name'>{person.name}</div>
          	<img src={`http://localhost:3008/${person.image}`} alt='profile'/>
            <p>
                <span>Birthday:</span>
                <span>{person.birth_year}</span>
            </p>
            <p>
                {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
                <span>Homeworld:</span>
                <span>{home}</span>
            </p>
            <h3><a onClick={() => this.displayEditform()}>Edit</a></h3>
            {editForm}
        </div>
    </div>

    );
  }
}

export default Card;
