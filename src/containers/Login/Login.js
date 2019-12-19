import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postSignIn } from '../../apiCalls/apiCalls';
import { addUser } from '../../actions';
import './Login.scss';

export class Login extends Component {
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
          <div className="error">{this.state.errorMsg}</div>
          <label>Email:</label>
          <input autoComplete="off" id="email" value={this.state.username} type="text" onChange={(event) => this.handleChange(event)}/>
          <label>Password:</label>
          <input id="password" value={this.state.password} type="password" onChange={(event) => this.handleChange(event)}/>
          <button className="sign-in" onClick={(event) => this.handleSubmit(event)}>Sign in</button>
          <Link id="back-home" to="/">Go back</Link>
        </div>
      </form>
    )
  }

  handleChange = (event) => {
    let { target } = event;
    if (this.state.email && this.state.password) {
      this.setState({errorMsg: ''});
    }
    switch(target.id) {
      case 'email':
        this.setState({email: target.value})
        break;
      case 'password':
        this.setState({password: target.value})
        break;
      default:
        console.log('hits default');
    }
  }

  validateForm = () => {
    if (this.state.email && this.state.password) {
      this.setState({errorMsg: ''});
      return true;
    } else {
      this.setState({errorMsg: 'Please enter an email and a password'});
      return false;
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      let user = {
        email: this.state.email,
        password: this.state.password
      };
      try {
        const result = await postSignIn(user)
        console.log(addUser(result.user).user)
        addUser(result.user)
      }
      catch (error) {
        console.error(error.message)
      }
    }
  }

}

export const mapDispatchToProps = dispatch => (
  {
    addUser
  }
)

export default connect(null, mapDispatchToProps)(Login);
