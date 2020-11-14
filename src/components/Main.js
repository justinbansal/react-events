import React from 'react';
import Nav from './Nav';
import Event from './Event';
import EventBuilder from './EventBuilder';
import RegisteredEvents from './RegisteredEvents';
import sampleEvents from '../sampleEvents';
import sampleUsers from '../sampleUsers';

class Main extends React.Component {
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

    // Variables
    const eventID = parseInt(e.currentTarget.id);
    const currentUser = this.state.currentUser;

    let updatedEvents = this.state.events.map(event => {
      if (event.id === eventID) {
        event.guests.push(currentUser);
      }
      return event;
    })

    // For clicked RSVP event, guests array updates to include user
    // Need to also add event to the user's registeredEvents

    // At this point the user should already be in the users object (TODO: add this in the login logic)
    // Filter all events based on currentUser and replace user's registeredEvents array with this array

    let events = updatedEvents.filter(function(event) {
      return event.guests.includes(currentUser);
    })

    // Update state
    const users = {...this.state.users};
    users[currentUser].registered = events;
    this.setState({
      users: users,
      events: updatedEvents
    })

  }

  removeEvent = (e) => {

    // Variables

    const eventID = parseInt(e.currentTarget.id);
    const currentUser = this.state.currentUser;

    // 1. Get an array with the selected event removed
    let registeredEvents = this.state.users[currentUser].registered.filter(function(event) {
      return event.id !== eventID;
    })

    // 2. Remove currentUser from guests of the deleted event as well

    let filteredGuests;
    let filteredEvents = this.state.events.map(function(event) {
      if (event.id === eventID) {
        filteredGuests = event.guests.filter(function(guest) {
          return guest !== currentUser;
        })
      }
    })

    // 3. Update state object
    const users = {...this.state.users};
    users[currentUser].registered = registeredEvents;
    const events = this.state.events.slice();

    // Update guests in events array
    const updatedEvents = events.map(function(event) {
      if (event.id === eventID) {
        event.guests = filteredGuests;
      }
      return event;
    })

    // Update state with new user object
    this.setState({
      users : users,
      events: updatedEvents
    })
  }

  render() {

    // If this person has registered events let's display them
    let showEvents;
    if (this.state.users[this.state.currentUser] && this.state.users[this.state.currentUser].registered.length > 0) {
      showEvents = <RegisteredEvents
      registeredEvents={this.state.users[this.state.currentUser].registered} formatMoney={this.formatMoney}
      removeEvent={this.removeEvent}
      />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Nav currentUser={this.state.currentUser} logout={this.props.logout} history={this.props.history}></Nav>
          </div>
        </div>
        <div className="row">
          <div className="col">
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
          {/* <div className="col">
            <h3>My Events</h3>
            {showEvents}
          </div> */}
          {/* <div className="col">
            <h3>Create Event</h3>
            <div className="add-events">
              <EventBuilder addEvent={this.addEvent} numberOfEvents={this.state.events.length} owner={this.state.currentUser}/>
              <button onClick={this.loadSampleData}>Load Sample Data</button>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

export default Main;
