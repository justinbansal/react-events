import React from 'react';
import Event from './Event';
import EventBuilder from './EventBuilder';
import RegisteredEvent from './RegisteredEvent';
import Login from './Login';
import sampleEvents from '../sampleEvents';

class App extends React.Component {
  state = {
    events: [],
    registeredEvents: [],
    uid: null,
    users: {}
  }

  componentDidMount = () => {
    console.log('MOUNTED');
  }

  componentDidUpdate = () => {
    console.log('UPDATED!')

  }

  componentWillUnmount = () => {
    console.log('UNMOUNT!')
  }

  addEvent = (event) => {
    const events = this.state.events.slice();
    events.push(event);
    this.setState({
      events: events
    })

    const users = {...this.state.users};
    users[this.state.uid].created.push(event);
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

    // Copy users
    const users = {...this.state.users};

    // Have to find the event with the matching ID

    const matchingEvents = this.state.events.filter(event => {
      return event.id === eventID
    });

    users[this.state.uid].registered.push(matchingEvents[0])
    this.setState({
      users: users
    })
  }

  removeEvent = (e) => {
    const eventID = parseInt(e.currentTarget.id);
    const registeredEvents = this.state.registeredEvents.filter((event) => {
      if (event.id === eventID) {
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
    const logout = <button onClick={this.logout}>Logout!</button>

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
          <h2>My Events</h2>
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
          <EventBuilder addEvent={this.addEvent} numberOfEvents={this.state.events.length} owner={this.state.uid}/>
          <button onClick={this.loadSampleEvents}>Load Sample Events</button>
          {logout}
        </div>
      </div>
    )
  }
}

export default App;
