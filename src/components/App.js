import React from 'react';
import Event from './Event';
import EventBuilder from './EventBuilder';
import RegisteredEvent from './RegisteredEvent';
import sampleEvents from '../sampleEvents';
import base from '../base';

class App extends React.Component {
  state = {
    events: [],
    registeredEvents: [],
  }

  componentDidMount = () => {
    this.ref = base.syncState('react-events-b1478', {
      context: this,
      state: 'events',
      asArray: true
    });
  }

  addEvent = (event) => {
    const events = this.state.events.slice();
    events.push(event);
    this.setState({
      events: events
    })
  }

  loadSampleEvents = () => {
    this.setState({
      events: sampleEvents
    })
  }

  formatMoney = (cents) => {
    let dollars = cents / 100;
    dollars = dollars.toLocaleString('en-us', {
      style: 'currency',
      currency: 'CAD'
    })
    return dollars;
  }

  eventRSVP = (e) => {
    const eventID = parseInt(e.currentTarget.id);

    const registeredEvents = this.state.events.filter((event) => {
      if (event.id === eventID) {
        event.available = false;
        return event;
      }
      return false;
    });

    const updatedEvents = this.state.registeredEvents.concat(registeredEvents);
    this.setState({
      registeredEvents: updatedEvents
    })
  }

  removeEvent = (e) => {
    const eventID = parseInt(e.currentTarget.id);
    const registeredEvents = this.state.registeredEvents.filter((event) => {
      if (event.id === eventID) {
        event.available = true;
        return false;
      } else {
        return event;
      }
    })
    this.setState({
      registeredEvents: registeredEvents
    })
  }

  render() {
    return (
      <div className="react-events">
        <div className="events-list">
          <h2>Available Events</h2>
          <ul className="events">
            {this.state.events.map((element, index) => (
              <Event
                key={index}
                index={index}
                details={this.state.events[index]}
                formatMoney={this.formatMoney}
                eventRSVP={this.eventRSVP}
              />
            ))}
          </ul>
        </div>
        <div className="event-details">
          <h2>Registered Events</h2>
          <ul className="registered-events">
            {this.state.registeredEvents.map((element, index) => (
              <RegisteredEvent
                key={index}
                index={index}
                details={this.state.registeredEvents[index]}
                formatMoney={this.formatMoney}
                removeEvent={this.removeEvent}
              />
            ))}
          </ul>
        </div>
        <div className="add-events">
          <h2>Add Event</h2>
          <EventBuilder addEvent={this.addEvent} numberOfEvents={this.state.events.length}/>
          <button onClick={this.loadSampleEvents}>Load Sample Events</button>
        </div>
      </div>
    )
  }
}

export default App;
