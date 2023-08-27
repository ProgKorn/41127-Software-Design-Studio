import React from 'react';
import Header from './Header';

function HelpCentre() {
  return (
    <div className="HelpCentre">
        <Header />
      <h1>Help Centre Page</h1>
      <div className="qna-section">
        <h2>Question: Where do i find my login credentials?</h2>
        <p>
            This is an explainer that is very revealing and definitely helped you a lot. Now you can log in!
        </p>
      </div>
      <div className="qna-section">
        <h2>Question: How do I enable browser permissions for camera and audio?</h2>
        <p>
            Probably a step by step here depending on browser? Could also just provide links to relevant explainers depending on browser also. {' '}
            <a href="https://support.google.com/chrome/answer/114662?hl=en&co=GENIE.Platform%3DDesktop" target="_blank" rel="noopener noreferrer">
                Chrome
            </a>
        </p>
      </div>
      <div className="qna-section">
        <h2>Question: My session was terminated but thats bs how do i complain</h2>
        <p>
            dont cheat bozo
        </p>
      </div>
    </div>
  );
}

export default HelpCentre;
