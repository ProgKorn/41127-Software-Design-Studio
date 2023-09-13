import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../css/Login.css';
import Loader from '../components/Loader';

function HelpCentre() {
  // Initialise loading state to true to make loader visible
  const [loading, setLoading] = useState(true);

  // Simulate an API call or other asynchronous operation
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 3000);
  }, []);
  
  return (
    <div className="HelpCentre">
        <Loader loading={loading} /> {/* Loader overlay */}
      <Header />
      <header className="help-centre-header">
        <h1 className="text">Sentinel Help Centre</h1>
        <div>
          <input type="text" placeholder="Search the documentation" />
          <button>Search</button>
        </div>
      </header>
      {!selectedButton && (
        <div className='help-dashboard'>
          <Grid container rowSpacing={10} columnSpacing={{ xs: 1 }}>
						<Grid item xs={6}>
							<Button className="helpDashboardButton" variant="contained" onClick={() => handleButtonClick('userManual')}>
								<div className="helpDashboardIcons"><AssignmentIcon/></div>
								User Manual
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className="helpDashboardButton" variant="contained" onClick={() => handleButtonClick('faceAuthTroubleshoot')}>
							<div className="helpDashboardIcons"><FaceRetouchingOffIcon/></div>
								Face Auth Troubleshoot?
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className="helpDashboardButton" variant="contained"onClick={() => handleButtonClick('flagging')}>
								<div className="helpDashboardIcons"><FlagIcon/></div>
								Flagging
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className="helpDashboardButton" variant="contained" onClick={() => handleButtonClick('termsAndConditions')}>
								<div className="helpDashboardIcons"><AssignmentLateIcon/></div>
								Terms and Conditions
              </Button>
						</Grid>
					</Grid>
        </div>
      )}
      
      {selectedButton === 'userManual' && (
      <UserManual onBackButtonClick={handleBackButtonClick} />
      )}
      {selectedButton === 'faceAuthTroubleshoot' && (
      <FaceAuthenticationTroubleshoot onBackButtonClick={handleBackButtonClick} />
      )}
      {selectedButton === 'flagging' && (
      <ComputerSpecs onBackButtonClick={handleBackButtonClick} />
      )}
      {selectedButton === 'termsAndConditions' && (
      <TermsAndConditions onBackButtonClick={handleBackButtonClick} />
      )}
    </div>
  );
}

export default HelpCentre;
