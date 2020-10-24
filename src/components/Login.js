import React from 'react';

const Login = (props) => (
  <nav className="login">
    <h2>Login</h2>
    <p>Sign in to manage your events</p>
    <button className="facebook login-button" onClick={() => props.authenticate('Facebook')}>
      Login with Facebook
    </button>
    <button className="google login-button" onClick={() => props.authenticate('Google')}>
      Login with Google
    </button>
  </nav>
)

export default Login;
