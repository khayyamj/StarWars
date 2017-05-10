import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    const { people, person, home } = this.props;
    if (!person || !home) return <div>loading card...</div>
    return (
      <div className='card'>
        <div className='card-content'>
          	<div className='card-name'>{person.name}</div>
          	<img src={`http://localhost:3008/${person.image}`} alt='profile'/>
            <p>
                <span>Birthday:</span>
                <span>{person.birthday}</span>
            </p>
            <p>
                {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
                <span>Homeworld:</span>
                <span>{home.planet}</span>
            </p>
        </div>
    </div>

    );
  }
}

export default Card;
