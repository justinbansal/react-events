import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import User from './User';

class App extends React.Component {
  state = {
    currentUser: null,
    users: {}
  }

  componentDidMount = () => {
    console.log('APP MOUNTED');

    const usersRef = localStorage.getItem('users');
    if (usersRef) {
      this.setState({
        users: JSON.parse(usersRef)
      })
    }

    // Check database to see if we have a currentUser defined
    const currentUserRef = localStorage.getItem('currentUser');
    if (currentUserRef) {
      this.setState({
        currentUser: currentUserRef
      })
    }
  }

  componentDidUpdate = () => {
    console.log('APP UPDATED!')
    localStorage.setItem('users', JSON.stringify(this.state.users));
  }

  login = (username) => {

    if (username) {
      if (this.state.users[username]) {

        this.setState({
          currentUser: username
        })

        localStorage.setItem('currentUser', username);

      } else {
        // create new user
        const users = {...this.state.users};
        users[username] = {
          isAdmin: false,
          registered: [],
          created: []
        }

        this.setState({
          users: users,
          currentUser: username
        })

        localStorage.setItem('currentUser', username);
      }
    }
  }

  logout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('currentUser');

    // @TODO: redirect to "/" homepage
    //this.props.history.push('/');
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => {
            if (this.state.currentUser) {
              return (
                <Main logout={this.logout}/>
              )
            } else {
              return (
                <Login login={this.login}/>
              )
            }
          }} />
          <Route exact path="/user/:username" render={() => {
            if (this.state.currentUser) {
              return (
                <User currentUser={this.state.currentUser} logout={this.logout}/>
              )
            } else {
              return (
                <Login login={this.login}/>
              )
            }
          }} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
