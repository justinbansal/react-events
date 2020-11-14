import React from 'react';
import { Link } from 'react-router-dom';

class User extends React.Component {
  render () {

    const username = this.props.currentUser;
    return (
      <div>
        <div className="container user">
          <div className="row">
            <div className="col">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/">Back to Feed</Link>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default User;
