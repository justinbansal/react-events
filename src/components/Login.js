import React from 'react';

class Login extends React.Component  {
  usernameRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.usernameRef.current.value)
    //this.props.history.push(`/users/${this.usernameRef.current.value}`);
  }

  render() {
    return (
      <div className="container login">
        <div className="row">
          <div className="col">
            <h2>Login to React Events</h2>
            <p>Enter a username to proceed</p>
            <form className="login-form" onSubmit={this.onSubmit}>
              <input type="text" name="username" placeholder="Username" ref={this.usernameRef} required/>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
