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
    uid: null,
    users: {}
  }

  componentDidMount = () => {
    console.log('MOUNTED');

    this.EventRef = base.syncState('react-events-b1478/events', {
      context: this,
      state: 'events',
      asArray: true
    });

    this.UsersRef= base.syncState('react-events-b1478/users', {
      context: this,
      state: 'users'
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    })
  }

  // componentDidUpdate = () => {
  //   console.log('UPDATED!')
  //   const events = this.state.events.slice();

  //   // compare id of items in both arrays
  //   events.forEach(event => {
  //     event.available = true;
  //     this.state.registeredEvents.forEach(registeredEvent => {
  //       if (event.id === registeredEvent.id) {
  //         event.available = false;
  //       }
  //     })
  //   })

  //   console.log(events);

  //   this.setState({
  //     events: events
  //   })
  // }

  componentWillUnmount = () => {
    base.removeBinding(this.EventRef);
    base.removeBinding(this.UsersRef);
  }

  addEvent = (event) => {
    const events = this.state.events.slice();
    events.push(event);
    this.setState({
      events: events
    })

    // Update users object
    // Find user
    // Push event object to created events array

    const users = {...this.state.users};
    users[this.state.uid].created.push(event);
    console.log(users);
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

  authHandler = (authData) => {

    // Look up current user
    // const users = await base.fetch(`react-events-b1478/users/${authData.user.uid}`, { context: this}) // returns promise
    // console.log(users);

    // if (!users[this.state.uid]) {
    //   // Save it
    //   await base.post('react-events-b1478/users/user', {
    //     data: authData.user.uid
    //   })
    // }
    const users = {};
    users[authData.user.uid] = {
      created: [],
      registered: []
    }

    console.log(users);

    this.setState({
      users: users,
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
      uid: null,
    })
  }

  render() {
    const logout = <button onClick={this.logout}>Logout!</button>

    console.log(this.state.users[this.state.uid]);

    // Check if they are logged in and if the user has been added
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
            {this.state.users[this.state.uid].registered.map((element, index) => (
              <RegisteredEvent
                key={index}
                index={index}
                details={this.state.users[this.state.uid].registered[index]}
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
