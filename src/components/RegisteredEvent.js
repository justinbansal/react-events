import React from 'react';

class RegisteredEvent extends React.Component {
  render() {
    const {name, location, date, time, cost, image, id} = this.props.details;
    return (
      <li className="event-list--event" style={{backgroundImage: `url(${image})`}}>
        <h3 className="event-name">{name}</h3>
        <p>{location}</p>
        <p>{date}</p>
        <p>{time}</p>
        <div className="wrapper">
          <span className="cost">{this.props.formatMoney(cost)}</span>
          <button id={id} className="button__remove" onClick={this.props.removeEvent}>&times;</button>
        </div>
      </li>
    )
  }
}

export default RegisteredEvent;
