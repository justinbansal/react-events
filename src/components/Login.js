import React from 'react';

class Login extends React.Component  {
  usernameRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login();
  }

  render() {
    return (
      <div className="container login">
        <div className="row">
          <div className="col">
            <h2>Login to React Events</h2>
            <p>Enter a username to proceed</p>
            <form className="login-form" onSubmit={this.onSubmit}>
              <button type="submit" className="login-button">
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
