import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import User from './User';
import EventBuilder from './EventBuilder';
import sampleEvents from '../sampleEvents';
import sampleUsers from '../sampleUsers';
import firebase from '../base';

class App extends React.Component {
  state = {
    events: [],
    currentUser: null,
    users: {}
  }

  componentDidMount = () => {
    console.log('MOUNTED');

    const eventsRef = firebase.database().ref('events');
    eventsRef.on('value', snapshot => {
      let events = snapshot.val();
      let newState = [];
      for (let event in events) {
        newState.push({
          id: event,
          cost: events[event].cost,
          date: events[event].date,
          image: events[event].image,
          location: events[event].location,
          name: events[event].name,
          owner: events[event].owner,
          time: events[event].time,
          guests: events[event].guests
        })
      }
      this.setState({
        events: newState
      })
    })

    const usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
        newState.push({
          id: user,
          username: users[user].username,
          isAdmin: false,
          registered: users[user].registered,
          created: users[user].created
        })
      }
      this.setState({
        users: newState
      })
    })

    firebase.database().ref('currentUser').on('value', (snapshot) => {
      const userRef = snapshot.val();
      if (userRef) {
        this.setState({
          currentUser: userRef.currentUser
        })
      }
    })
  }

  componentWillUnmount = () => {
    console.log('UNMOUNTED!');

    firebase.database().ref('users').off();
    firebase.database().ref('events').off();
  }

  login = (username) => {

    let users = this.state.users;
    if (username) {
      // Check if there are any users
      if (users.length > 0) {

        for (let user in users) {
          // If user matches one of our users, update currentUser only
          if (users[user].username) {
            this.setState({
              currentUser: username
            })

            firebase.database().ref('currentUser').set({
              currentUser: username
            });

          } else {
            // If user does not match, create new user
            let newUser = {
              username: username,
              isAdmin: false,
              registered: false,
              created: false
            }

            const users = {...this.state.users, ...newUser};

            this.setState({
              users: users,
              currentUser: username
            })

            firebase.database().ref('currentUser').set({
              currentUser: username
            });

            const usersRef = firebase.database().ref('users');
            usersRef.push(users);
          }
        }
      } else {
        // If there are no users, create new user
        let newUser = {
          username: username,
          isAdmin: false,
          registered: false,
          created: false
        }

        const users = {...this.state.users, ...newUser};

        this.setState({
          users: users,
          currentUser: username
        })

        firebase.database().ref('currentUser').set({
          currentUser: username
        });

        const usersRef = firebase.database().ref('users');
        usersRef.push(users);
      }
    }
  }

  logout = () => {
    this.setState({
      currentUser: null
    })

     // Delete record of currentUser
    firebase.database().ref('currentUser').remove();
  }

  formatMoney = (cents) => {
    let dollars = (cents / 100).toLocaleString('en-us', {
      style: 'currency',
      currency: 'CAD'
    })
    return dollars;
  }

  eventRSVP = (e) => {
    console.log('eventRSVP');

    // Variables
    const eventID = e.currentTarget.id;
    const currentUser = this.state.currentUser;

    let updatedEvents = this.state.events.map(event => {
      if (event.id === eventID) {
        if (event.guests) {
          console.log('guests array exists');
          event.guests.push(currentUser);
        } else {
          console.log(currentUser);
          event.guests = [];
          event.guests.push(currentUser);
        }
      }
      return event;
    })

    console.log(updatedEvents);

    // For clicked RSVP event, guests array updates to include user
    // Need to also add event to the user's registeredEvents

    // At this point the user should already be in the users object (TODO: add this in the login logic)
    // Filter all events based on currentUser and replace user's registeredEvents array with this array

    let events = updatedEvents.filter(function(event) {
      console.log(event);
      if (event.guests) {
        return event.guests.includes(currentUser);
      } else {
        event.guests = [];
        return event.guests.includes(currentUser);
      }
    })

    console.log(events);

    // Update state
    const users = {...this.state.users};
    for (let user in users) {
      if (users[user].username === this.state.currentUser) {
        if (users[user].registered) {
          users[user].registered = events;
        } else {
          users[user].registered = [];
          users[user].registered = events;
        }
      }
    }

    this.setState({
      users: users,
      events: updatedEvents
    })

  }

  addEvent = (event) => {
    const events = this.state.events.slice();
    events.push(event);

    // Create event
    const eventsRef = firebase.database().ref('events');
    eventsRef.push(event);

    // Add event to user's created aray
    const users = {...this.state.users};
    for (let user in users) {
      if (users[user].username === this.state.currentUser) {
        if (users[user].created) {
          users[user].created.push(event);
        } else {
          users[user].created = [];
          users[user].created.push(event);
        }
      }
    }

    this.setState({
      users: users,
      events: events
    })
  }

  removeEvent = (e) => {

    // Variables

    const eventID = e.currentTarget.id;
    const currentUser = this.state.currentUser;

    // 1. Get an array with the selected event removed
    let registeredEvents = this.state.users[currentUser].registered.filter(function(event) {
      return event.id !== eventID;
    })

    // 2. Remove currentUser from guests of the deleted event as well
    let events = this.state.events.slice();
    let filteredGuests;
    events.forEach(function(event) {
      if (event.id === eventID) {
        filteredGuests = event.guests.filter(function(guest) {
          return guest !== currentUser;
        })
        event.guests = filteredGuests;
      }
    })

    // 3. Update state object
    const users = {...this.state.users};
    users[currentUser].registered = registeredEvents;

    // Update state with new user object
    this.setState({
      users : users,
      events: events
    })
  }

  deleteEvent = (e) => {

    // Variables
    const eventID = e.currentTarget.id;

    // 1. Get an array with the selected event removed
    let updatedEvents = this.state.events.filter(function(event) {
      return event.id !== eventID;
    })

    // 2. Remove event from all users' registered events
    const users = {...this.state.users};

    // For each user, if event in registered events array matches ID, remove it
    for (let user in users) {
      if (users[user].registered) {
        let filteredEvents = users[user].registered.filter(function(event) {
          return event.id !== eventID;
        })
        users[user].registered = filteredEvents;
      }
    }

    // Delete event from fb
    const eventRef = firebase.database().ref(`/events/${eventID}`);
    eventRef.remove();

    // 3. Update state object
    this.setState({
      users: users,
      events: updatedEvents
    })
  }

  loadSampleData = () => {
    console.log('loadSampleData triggered');
    this.setState({
      events: sampleEvents,
      users: sampleUsers
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(matchProps) => {
            if (this.state.currentUser) {
              return (
                <div>
                  <Main
                    logout={this.logout}
                    {...matchProps}
                    formatMoney={this.formatMoney}
                    events={this.state.events}
                    eventRSVP={this.eventRSVP}
                    currentUser={this.state.currentUser}
                    deleteEvent={this.deleteEvent}
                  />
                </div>
              )
            } else {
              return (
                <Login login={this.login}/>
              )
            }
          }} />
          <Route exact path="/user/:username" render={(matchProps) => {
            return (
              <User
                currentUser={this.state.currentUser}
                logout={this.logout}
                {...matchProps}
                users={this.state.users}
                formatMoney={this.formatMoney}
                removeEvent={this.removeEvent}
              />
            )
          }} />
          <Route exact path="/event/new" render={(matchProps) => {
            return (
              <EventBuilder
                logout={this.logout}
                {...matchProps}
                owner={this.state.currentUser}
                numberOfEvents={this.state.events.length}
                addEvent={this.addEvent}
              />
            )
          }} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
