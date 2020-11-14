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

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => {
            if (this.state.currentUser) {
              return (
                <Main />
              )
            } else {
              return (
                <Login login={this.login}/>
              )
            }
          }} />
          <Route exact path="/user/:username" render={() => {
            return (
              <User currentUser={this.state.currentUser}/>
            )
          }} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
