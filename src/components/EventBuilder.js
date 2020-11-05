import React from 'react';

class EventBuilder extends React.Component {
  nameRef = React.createRef();
  locationRef = React.createRef();
  dateRef = React.createRef();
  timeRef = React.createRef();
  costRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const event = {
      name: this.nameRef.current.value,
      location: this.locationRef.current.value,
      date: this.dateRef.current.value,
      time: this.timeRef.current.value,
      cost: this.costRef.current.value,
      available: true,
      id: this.props.numberOfEvents + 1,
      owner: this.props.owner,
      guests: []
    }
    this.props.addEvent(event);
  }

  render() {
    return (
      <form className="event-builder" onSubmit={this.onSubmit}>
        <input type="text" name="name" placeholder="name" ref={this.nameRef}/>
        <input type="text" name="location" placeholder="location" ref={this.locationRef}/>
        <input type="text" name="date" placeholder="date" ref={this.dateRef}/>
        <input type="text" name="time" placeholder="time" ref={this.timeRef}/>
        <input type="text" name="cost" placeholder="cost" ref={this.costRef}/>
        <button type="submit">Create Event</button>
      </form>
    )
  }
}

export default EventBuilder;
