import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Header = ({ login }) => {
  let toggleLogin;
  login ?
  toggleLogin = <button id="logout" className="toggleLogin">Logout</button> : toggleLogin = <Link id="login-link" to="/login">
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
  login: state.login
});

export default connect(mapStateToProps)(Header);
