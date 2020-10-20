import React from 'react';

class Event extends React.Component {
  render() {
    const {name, location, date, time, cost, image} = this.props.details;
    return (
      <li className="event-list--event">
        <img src={image} alt={name}/>
        <h3 className="event-name">{name}
          <span className="cost">{cost}</span>
        </h3>
        <p>{location}</p>
        <p>{date}</p>
        <p>{time}</p>
      </li>
    )
  }
}

export default Event;
