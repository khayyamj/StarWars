import React, { Component } from 'react';
import './Card.css';

let editForm='';

class Card extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  displayEditform () {
    const { person, home } = this.props;
    this.setState({ visible: !this.state.visible});
    console.log('visible toggle')
    if (this.state.visible) {
      editForm = (<form onSubmit={this.handleFormSubmit}>
        <h2>Update:</h2>
        <input placeholder={person.name} name='name' />
        <input placeholder={person.birth_year} name='birth_year' />
        <input placeholder={person.image} name='url' />
      </form>)
    } else {
      editForm = '';
    }
  }
  render() {
    const { person, home } = this.props;
    return (
      <div className='card'>
        <div className='card-content'>
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
            <h3><a onClick={() => this.displayEditform(person, home)}>Edit</a></h3>
            {editForm}
        </div>
    </div>

    );
  }
}

export default Card;
