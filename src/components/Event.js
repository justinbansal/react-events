import React from 'react';

class Event extends React.Component {
  render() {
    const {name, location, date, time, cost, available, id, owner, guests} = this.props.details;
    return (
      <li className="event-list--event">
        <h3 className="event-name">{name}</h3>
        <p>{location}</p>
        <p>{date}</p>
        <p>{time}</p>
        <p>Owner: {owner}</p>
        <ul className="guests">
          Guests:
          {guests && guests.map((guest, index) => (
            <li key={index}>{guest}</li>
          ))}
        </ul>
        <div className="wrapper">
          <span className="cost">{this.props.formatMoney(cost)}</span>
          <button id={id} disabled={!available ? true : false} className="button__rsvp" onClick={this.props.eventRSVP}>RSVP</button>
        </div>
      </li>
    )
  }
}

export default Event;
