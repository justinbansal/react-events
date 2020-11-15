import React from 'react';
import Nav from './Nav';

class EventBuilder extends React.Component {
  nameRef = React.createRef();
  locationRef = React.createRef();
  dateRef = React.createRef();
  timeRef = React.createRef();
  costRef = React.createRef();
  imageRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const event = {
      name: this.nameRef.current.value,
      location: this.locationRef.current.value,
      date: this.dateRef.current.value,
      time: this.timeRef.current.value,
      cost: this.costRef.current.value ? parseFloat(this.costRef.current.value) : 0,
      image: this.imageRef.current.value,
      id: this.props.numberOfEvents + 1,
      owner: this.props.owner,
      guests: []
    }
    this.props.addEvent(event);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Nav
                currentUser={this.props.owner}
                logout={this.props.logout}
                history={this.props.history}
                match={this.props.match}>
              </Nav>
              <form className="event-builder" onSubmit={this.onSubmit}>
                <input type="text" name="name" placeholder="name" ref={this.nameRef} required/>
                <input type="text" name="location" placeholder="location" ref={this.locationRef} required/>
                <input type="date" name="date" placeholder="date" ref={this.dateRef}/>
                <input type="time" name="time" placeholder="time" ref={this.timeRef}/>
                <input type="number" name="cost" placeholder="cost" ref={this.costRef}/>
                <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
                <button type="submit">Create Event</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default EventBuilder;
