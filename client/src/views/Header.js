import React from 'react';
import logo from '../logo.svg';

function Header() {
  return (
    <div className="Header">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default Header;