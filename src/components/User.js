import React from 'react';
import Nav from './Nav';

class User extends React.Component {
  render () {

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Nav currentUser={this.props.currentUser} logout={this.props.logout} history={this.props.history}></Nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default User;
