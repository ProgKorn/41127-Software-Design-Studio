import React from 'react';
import logo from '../logo.svg';

function Header() {
    return (
        <div className="Header">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is the header. The landing page is currently under <code>src/App.js</code>.</p>
        <nav>
        <ul>
          <a href="/homepage" className="App-link" target="_blank" rel="noopener noreferrer">
            Homepage
          </a>
        </ul>
        <ul>
          <a href="/exam" className="App-link" target="_blank" rel="noopener noreferrer">
            Exam
          </a>
        </ul>
        <ul>
          <a href="/login" className="App-link" target="_blank" rel="noopener noreferrer">
            Login
          </a>
        </ul>
        <ul>
          <a href="/student" className="App-link" target="_blank" rel="noopener noreferrer">
            Student Homepage
          </a>
        </ul>
        <ul>
          <a href="/admin" className="App-link" target="_blank" rel="noopener noreferrer">
            Admin Homepage
          </a>
        </ul>
        </nav>
        </header>
        </div>
    );
}

export default Header;