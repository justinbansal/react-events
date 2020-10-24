import React from 'react';
import Event from './Event';
import EventBuilder from './EventBuilder';
import RegisteredEvent from './RegisteredEvent';
import sampleEvents from '../sampleEvents';

class App extends React.Component {
  state = {
    events: [],
    registeredEvents: [],
  }

  addEvent = (event) => {
    const events = this.state.events.slice();
    events.push(event);
    this.setState({
      events: events
    })
  }

  componentDidMount = () => {
    this.loadSampleEvents();
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

  eventRSVP = (id) => {
    const registeredEvent = this.state.events[id];
    const registeredEvents = this.state.registeredEvents.slice();
    registeredEvents.push(registeredEvent);
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
              />
            ))}
          </ul>
        </div>
        <div className="add-events">
          <h2>Add Event</h2>
          <EventBuilder addEvent={this.addEvent}/>
        </div>

      </div>
    )
  }
}

export default App;
