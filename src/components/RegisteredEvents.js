import React from 'react'
import RegisteredEvent from './RegisteredEvent';

class RegisteredEvents extends React.Component {
  render() {
    return (
      <div className="event-details">
        <h2>My Events</h2>
        <ul className="registered-events">
          {this.props.registeredEvents.map((element, index) => (
            <RegisteredEvent
              key={index}
              index={index}
              details={this.props.registeredEvents[index]}
              formatMoney={this.props.formatMoney}
              removeEvent={this.props.removeEvent}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default RegisteredEvents;
