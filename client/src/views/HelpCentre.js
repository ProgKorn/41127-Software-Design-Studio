import React from 'react';
import {Header} from './Header';
import '../css/Login.css';

function HelpCentre() {
  return (
    <div className="HelpCentre">
        <Header />
      {/* <h1 className="help-centre-title">Sentinel Help Centre</h1> */}
      <header className="help-centre-header">
        <h1>Sentinel Help Centre</h1>
        <h4>How may we help?</h4>
        <div>
            <input type="text" placeholder="Search the documentation" />
            <button>Search</button>
        </div>
      </header>
      <div className="qna-section">
        <h3>Question: Where do i find my login credentials?</h3>
        <p>
            This is an explainer that is very revealing and definitely helped you a lot. Now you can log in!
        </p>
      </div>
      <div className="qna-section">
        <h3>Question: How do I enable browser permissions for camera and audio?</h3>
        <p>
            Probably a step by step here depending on browser? Could also just provide links to relevant explainers depending on browser also. {' '}
            <a href="https://support.google.com/chrome/answer/114662?hl=en&co=GENIE.Platform%3DDesktop" target="_blank" rel="noopener noreferrer">
                Chrome
            </a>
        </p>
      </div>
      <div className="qna-section">
        <h3>Question: My session was terminated but thats bs how do i complain</h3>
        <p>
            dont cheat bozo
        </p>
      </div>
      <div>
      <a class="back-link" href="javascript:history.back()"> &lt; Back</a>
      </div>
    </div>
  );
}

export default HelpCentre;
