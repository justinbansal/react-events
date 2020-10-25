import React from 'react';
import Event from './Event';
import EventBuilder from './EventBuilder';
import RegisteredEvent from './RegisteredEvent';
import Login from './Login';
import sampleEvents from '../sampleEvents';
import sampleUsers from '../sampleUsers';

class App extends React.Component {
  state = {
    events: [],
    registeredEvents: [],
    currentUser: null,
    users: {}
  }

  componentDidMount = () => {
    console.log('MOUNTED');
    const localStorageRef = localStorage.getItem('events');
    if (localStorageRef) {
      this.setState({
        events: JSON.parse(localStorageRef)
      })
    }

    // Check database to see if we have a currentUser defined
    const currentUserRef = localStorage.getItem('currentUser');
    if (currentUserRef) {
      this.setState({
        currentUser: currentUserRef
      })
    }
  }

  componentDidUpdate = () => {
    console.log('UPDATED!')
    localStorage.setItem('events', JSON.stringify(this.state.events));
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

  loadSampleData = () => {
    this.setState({
      events: sampleEvents,
      users: sampleUsers
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

  login = () => {
    // Check database to see if we have a currentUser defined
    const localStorageRef = localStorage.getItem('currentUser');
    if (localStorageRef) {
      this.setState({
        currentUser: localStorageRef
      })
    } else {
      const currentUser = `User${Date.now()}`
      localStorage.setItem('currentUser', currentUser);
      this.setState({
        currentUser: currentUser
      })
    }
  }

  logout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('currentUser');
  }

  render() {
    const logout = <button className="logout-button" onClick={this.logout}>Logout!</button>

    if (!this.state.currentUser) {
      return <Login login={this.login}/>
    }

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
          <button onClick={this.loadSampleData}>Load Sample Data</button>
          {logout}
        </div>
      </div>
    )
  }
}

export default App;
