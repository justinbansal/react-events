import React from 'react';

class User extends React.Component {
  render () {

    const username = this.props.match.params.userId;
    return (
      <div>
        <div className="container user">
          <div className="row">
            <div className="col">
              <h2>Welcome {username}!</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default User;
