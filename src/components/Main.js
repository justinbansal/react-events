import React from 'react';
import Nav from './Nav';
import Event from './Event';
import EventBuilder from './EventBuilder';
import RegisteredEvents from './RegisteredEvents';

class Main extends React.Component {

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Nav
              currentUser={this.props.currentUser}
              logout={this.props.logout}
              history={this.props.history}
              match={this.props.match}>
            </Nav>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ul className="events">
              {this.props.events.length > 0 && this.props.events.map((element, index) => (
                <Event
                  key={index}
                  index={index}
                  details={this.props.events[index]}
                  formatMoney={this.props.formatMoney}
                  eventRSVP={this.props.eventRSVP}
                  currentUser={this.props.currentUser}
                />
              ))}
            </ul>
            </div>
        </div>
      </div>
    )
  }
}

export default Main;
