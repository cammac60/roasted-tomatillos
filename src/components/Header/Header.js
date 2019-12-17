import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';

const Header = ({ login }) => {
  let toggleLogin;
  login ?
  toggleLogin = <button id="logout" className="toggleLogin">Logout</button> : toggleLogin = <button id="login" className="toggleLogin">Login</button>;
  return (
    <header className="header">
      <h1>Rancid Tomatillos</h1>
      {toggleLogin}
    </header>
  )
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps)(Header);
