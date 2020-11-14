import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component  {

  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    const logout = <button className="logout-button" onClick={this.handleLogout}>Logout!</button>

    let userLink = `user/${this.props.currentUser}`;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">React Events</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={userLink}>My Events</Link>
            </li>
            <li className="nav-item nav-item--username">
              <Link className="nav-link" to="#">{this.props.match.params.username ? this.props.match.params.username : this.props.currentUser }</Link>
            </li>
            {logout}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;
