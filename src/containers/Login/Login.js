import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

class Login extends Component {
  constructor(state) {
    super(state);
    this.state = {
      email: '',
      password: '',
      errorMsg: ''
    }
  }

  render() {
    return (
      <form className="login-form">
        <h3>Please sign in to continue</h3>
        <div className="input-wrapper">
          <label>Email:</label>
          <input value={this.state.username} type="text" />
          <label>Password:</label>
          <input value={this.state.password} type="password" />
          <button className="sign-in">Sign in</button>
          <Link id="back-home" to="/">Go back</Link>
        </div>
      </form>
    )
  }
}

export default Login;
