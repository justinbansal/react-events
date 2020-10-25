import React from 'react';

const Login = (props) => (
  <nav className="login">
    <h2>Login</h2>
    <p>Sign in to manage your events</p>
    <button className="login-button" onClick={props.login}>
      Login
    </button>
  </nav>
)

export default Login;
