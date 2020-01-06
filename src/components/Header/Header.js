import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { removeUser } from '../../actions';

export const Header = ({ user, removeUser }) => {
  let toggleLogin;
  user.id ?
  toggleLogin = <button id="logout" className="toggleLogin" onClick={removeUser}>Logout</button> : toggleLogin = <Link id="login-link" to="/login">
    <button id="login" className="toggleLogin">
      Login
    </button>
  </Link>;
  return (
    <header className="header">
      <h1>Rancid Tomatillos</h1>
      {toggleLogin}
    </header>
  )
}

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    removeUser
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Header);
