import React, { Component } from 'react';
import './Login.scss';

class Login extends Component {
  constructor(state) {
    super(state);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <form className="login-form">
        <h3>Please sign in to continue</h3>
        <div className="input-wrapper">
          <label>Username:</label>
          <input type="text" />
          <label>Password:</label>
          <input type="password" />
        </div>
      </form>
    )
  }
}

export default Login;
