import React from 'react';
import Nav from './Nav';
import RegisteredEvents from './RegisteredEvents';

class User extends React.Component {
  render () {

    let users = this.props.users;
    let currentUser = this.props.currentUser;

    // If this person has registered events let's display them
    let showEvents;
    if (users[currentUser] && users[currentUser].registered.length > 0) {
      showEvents =
        <RegisteredEvents
          registeredEvents={users[currentUser].registered}
          formatMoney={this.props.formatMoney}
          removeEvent={this.props.removeEvent}
        />;
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
