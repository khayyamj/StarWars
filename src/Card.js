import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
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
        </div>
    </div>

    );
  }
}

export default Card;
