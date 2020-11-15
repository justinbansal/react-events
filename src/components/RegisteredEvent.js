import React from 'react';

class RegisteredEvent extends React.Component {
  render() {
    const {name, location, date, time, cost, image, owner, guests, id} = this.props.details;

    let backgroundStyle;
    if (image) {
      backgroundStyle = {backgroundImage: `url(${image})`}
    } else {
      backgroundStyle = {background: "#000000"}
    }

    return (
      <li className="event-list--event" style={backgroundStyle}>
        <div className="event__content">
          <h3 className="event-name">{name}</h3>
          <p>{location}</p>
          <p>{date}</p>
          <p>{time}</p>
          <p>Owner: {owner}</p>
          <div className="guests">
            {guests && guests.map((guest, index) => (
              <div className="guest" key={index}>{guest}</div>
            ))}
          </div>
          <div className="wrapper">
            <span className="cost">{this.props.formatMoney(cost)}</span>
            <button id={id} className="button__remove" onClick={this.props.removeEvent}>&times;</button>
          </div>
        </div>
      </li>
    )
  }
}

export default RegisteredEvent;
