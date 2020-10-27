import React from 'react';

class Login extends React.Component  {
  usernameRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.usernameRef.current.value)
  }

  render() {
    return (
      <nav className="login">
        <h2>Login</h2>
        <p>Sign in to manage your events</p>
        <form className="login-form" onSubmit={this.onSubmit}>
          <input type="text" name="username" placeholder="Username" ref={this.usernameRef}/>
          <button type="submit"className="login-button">
            Login
          </button>
        </form>

      </nav>
    )
  }
}

export default Login;
