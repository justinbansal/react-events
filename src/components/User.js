import React from 'react';
import Nav from './Nav';
import RegisteredEvents from './RegisteredEvents';

class User extends React.Component {
  render () {

    let users = this.props.users;
    let currentUser = this.props.currentUser;

    // If this person has registered events let's display them
    let showEvents;
    for (let user in users) {
      if (users[user].username === currentUser && users[user].registered) {
        showEvents =
          <RegisteredEvents
            registeredEvents={users[user].registered}
            formatMoney={this.props.formatMoney}
            removeEvent={this.props.removeEvent}
          />;
      }
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Nav
                currentUser={this.props.currentUser}
                logout={this.props.logout}
                history={this.props.history}
                match={this.props.match}>
              </Nav>
              {showEvents}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default User;
