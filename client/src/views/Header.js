import React from 'react';
import logo from '../SentinelV1.svg';

function Header() {
  return (
    <div className="Header">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Logo" />
      </header>
    </div>
  );
}

function Title() {
  return (
    <div className="Header">
      <header className="App-header">
        <img src={logo} className="Title-logo" alt="Logo" />
      </header>
    </div>
  );
}

export { Header, Title };