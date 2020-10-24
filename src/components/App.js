import React from 'react';
import Event from './Event';
import EventBuilder from './EventBuilder';
import RegisteredEvent from './RegisteredEvent';
import Login from './Login';
import sampleEvents from '../sampleEvents';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class App extends React.Component {
  state = {
    events: [],
    registeredEvents: [],
    uid: null
  }

  componentDidMount = () => {
    console.log('MOUNTED');

    this.EventRef = base.syncState('react-events-b1478/events', {
      context: this,
      state: 'events',
      asArray: true
    });

    this.RegisteredEventsRef= base.syncState('react-events-b1478/registeredEvents', {
      context: this,
      state: 'registeredEvents',
      asArray: true
    });

    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     console.log(user);
    //     this.authHandler({ user });
    //   }
    // })
  }

  componentDidUpdate = () => {
    const events = this.state.events.slice();

    // compare id of items in both arrays
    events.forEach(event => {
      event.available = true;
      this.state.registeredEvents.forEach(registeredEvent => {
        if (event.id === registeredEvent.id) {
          event.available = false;
        }
      })
    })

    this.setState({
      events: events
    })
  }

  componentWillUnmount = () => {
    base.removeBinding(this.EventRef);
    base.removeBinding(this.RegisteredEventsRef);
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
        return false;
      } else {
        return event;
      }
    })
    this.setState({
      registeredEvents: registeredEvents
    })
  }

  authHandler = (authData) => {
    // Look up the current event in the firebase database
    // Claim it if there is no owner
    // Set the state to reflect the current user
    console.log(authData);

    this.setState({
      uid: authData.user.uid
    })
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null
    })
  }

  render() {
    const logout = <button onClick={this.logout}>Logout!</button>

    // Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}/>
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
          <button onClick={this.loadSampleEvents}>Load Sample Events</button>
          {logout}
        </div>
      </div>
    )
  }
}

export default App;
