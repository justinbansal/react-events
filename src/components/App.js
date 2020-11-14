import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import User from './User';
import sampleEvents from '../sampleEvents';
import sampleUsers from '../sampleUsers';

class App extends React.Component {
  state = {
    events: [],
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
    console.log('APP UPDATED!')
    localStorage.setItem('users', JSON.stringify(this.state.users));
    localStorage.setItem('events', JSON.stringify(this.state.events));
  }

  login = (username) => {

    if (username) {
      if (this.state.users[username]) {

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
                  />
                  <button onClick={this.loadSampleData}></button>
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
                currentUser={this.state.currentUser}
                formatMoney={this.formatMoney}
                removeEvent={this.removeEvent}
              />
            )
          }} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
