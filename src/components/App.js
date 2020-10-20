import React from 'react';
import Event from './Event';
import EventBuilder from './EventBuilder';
import sampleEvents from '../sampleEvents';

class App extends React.Component {
  state = {
    events: []
  }

  addEvent = (event) => {
    const events = {...this.state.events};
    events[`event1${Date.now()}`] = event;
    this.setState({
      events: events
    })
  }

  loadSampleEvents = () => {
    this.setState({
      events: sampleEvents
    })
  }

  render() {
    return (
      <div className="react-events">
        <h1>React Events</h1>
        <button onClick={this.loadSampleEvents}>Load Sample Events</button>
        <div className="events-list">
          <ul className="events">
            {this.state.events.map((element, index) => (
              <Event
                key={index}
                details={this.state.events[index]}
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
