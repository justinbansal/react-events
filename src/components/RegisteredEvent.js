import React from 'react';

class RegisteredEvent extends React.Component {
  render() {
    const {name, location, date, time, cost} = this.props.details;
    return (
      <li className="event-list--event">
        <h3 className="event-name">{name}</h3>
        <p>{location}</p>
        <p>{date}</p>
        <p>{time}</p>
        <div className="wrapper">
          <span className="cost">{this.props.formatMoney(cost)}</span>
        </div>
      </li>
    )
  }
}

export default RegisteredEvent;
