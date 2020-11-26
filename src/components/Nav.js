import React from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component  {

  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    const logout = <button className="logout-button" onClick={this.handleLogout}>Logout!</button>

    let userLink = `/user/${this.props.currentUser}`;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">React Events</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to={userLink}>My Events</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/event/new">Add Event</NavLink>
            </li>
            <li className="nav-item nav-item--username">
              <NavLink className="nav-link" to="#">{this.props.displayName}</NavLink>
            </li>
            {logout}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;
