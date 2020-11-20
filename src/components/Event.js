import React from 'react';

class Event extends React.Component {
  render() {
    const {name, location, date, time, cost, image, id, owner, guests} = this.props.details;

    // RSVP button should be disabled if the current user is already in the guests array
    let showRSVPButton = false;

    if (guests && guests.includes(this.props.currentUser)) {
      showRSVPButton = false;
    } else {
      showRSVPButton = true;
    }

    let backgroundStyle;
    if (image) {
      backgroundStyle = {backgroundImage: `url(${image})`}
    } else {
      backgroundStyle = {background: "#000000"}
    }

    let showDeleteButton = null;
    if (owner === this.props.currentUser) {
      showDeleteButton = <button id={id} type="button" className="btn btn-danger btn-delete" onClick={this.props.deleteEvent}>&times;</button>;
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
            <button id={id} disabled={!showRSVPButton ? true : false} className="button__rsvp" onClick={this.props.eventRSVP}>RSVP</button>
          </div>
          {showDeleteButton}
        </div>
      </li>
    )
  }
}

export default Event;
