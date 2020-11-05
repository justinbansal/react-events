import React from 'react';
import Event from './Event';
import EventBuilder from './EventBuilder';
import RegisteredEvents from './RegisteredEvents';
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

    const usersRef = localStorage.getItem('users');
    if (usersRef) {
      this.setState({
        users: JSON.parse(usersRef)
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
    localStorage.setItem('users', JSON.stringify(this.state.users));
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
    users[this.state.currentUser].created.push(event);
  }

  loadSampleData = () => {
    this.setState({
      events: sampleEvents,
      users: sampleUsers
    })
  }

  formatMoney = (amount) => {
    let dollars = amount.toLocaleString('en-us', {
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

    let matchingEvent = matchingEvents[0];

    // Add guests
    matchingEvent.guests.push(this.state.currentUser);

    users[this.state.currentUser].registered.push(matchingEvent);
    this.setState({
      users: users
    })

  }

  removeEvent = (e) => {

    // Grabs event ID of the one we are removing
    const eventID = parseInt(e.currentTarget.id);

    // Filters into array of events that don't match the one being removed
    const registeredEvents = this.state.users[this.state.currentUser].registered.filter((event) => {
      if (event.id === eventID) {
        return false;
      } else {
        return event;
      }
    })

    let updatedGuests;
    const currentUser = this.state.currentUser;

    // Remove currentUser from guests of the deleted event as well
    const availableEvents = this.state.events.filter((event) => {
      if (event.id === eventID) {
        // Event matches
        updatedGuests = event.guests.filter(guest => {
          if (guest === currentUser) {
            return false;
          } else {
            return true;
          }
        })
      }
    })

    // Copies user object
    const users = {...this.state.users};
    // Update registered array with new array
    users[this.state.currentUser].registered = registeredEvents;

    // Copy events object
    const events = this.state.events.slice();

    // Update guests for the event with that ID
    const updatedEvents = events.map(function(event) {
      if (event.id === eventID) {
        event.guests = updatedGuests;
      }
      return event;
    })

    // Update state with new user object
    this.setState({
      users : users,
      events: updatedEvents
    })
  }

  login = (username) => {

    if (username) {
      if (this.state.users[username]) {
        // User exists
        // Let them in
        this.setState({
          currentUser: username
        })

        localStorage.setItem('currentUser', username);
      } else {
        // create new user
        const users = {...this.state.users};
        users[username] = {
          isAdmin: false,
          registered: [],
          created: []
        }

        this.setState({
          users: users,
          currentUser: username
        })

        localStorage.setItem('currentUser', username);
      }
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

    // If this person has registered events let's display them
    let showEvents;
    if (this.state.users[this.state.currentUser] && this.state.users[this.state.currentUser].registered.length > 0) {
      showEvents = <RegisteredEvents
      registeredEvents={this.state.users[this.state.currentUser].registered} formatMoney={this.formatMoney}
      removeEvent={this.removeEvent}
      />;
    }

    if (!this.state.currentUser) {
      return <Login login={this.login}/>
    }

    return (
      <div className="react-events">
        <div className="events-list">
          <h2>Available Events</h2>
          <ul className="events">
            {this.state.events.length > 0 && this.state.events.map((element, index) => (
              <Event
                key={index}
                index={index}
                details={this.state.events[index]}
                formatMoney={this.formatMoney}
                eventRSVP={this.eventRSVP}
                currentUser={this.state.currentUser}
              />
            ))}
          </ul>
        </div>
        {showEvents}
        <div className="add-events">
          <h2>Add Event</h2>
          <EventBuilder addEvent={this.addEvent} numberOfEvents={this.state.events.length} owner={this.state.currentUser}/>
          <button onClick={this.loadSampleData}>Load Sample Data</button>
          {logout}
        </div>
      </div>
    )
  }
}

export default App;
