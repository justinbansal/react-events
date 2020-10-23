import React from 'react';
import Event from './Event';
import EventBuilder from './EventBuilder';
import sampleEvents from '../sampleEvents';

class App extends React.Component {
  state = {
    events: []
  }

  addEvent = (event) => {
    const events = this.state.events.slice();
    events.push(event);
    this.setState({
      events: events
    })
  }

  componentDidMount = () => {
    this.loadSampleEvents();
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

  render() {
    return (
      <div className="react-events">
        <h1>React Events</h1>
        <div className="events-list">
          <ul className="events">
            {this.state.events.map((element, index) => (
              <Event
                key={index}
                details={this.state.events[index]}
                formatMoney={this.formatMoney}
              />
            ))}
          </ul>
        </div>
        <div className="add-events">

        </div>
        <div className="event-details">

        </div>
        <EventBuilder addEvent={this.addEvent}/>
      </div>
    )
  }
}

export default App;
