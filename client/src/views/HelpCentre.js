import React, { useState } from 'react';
import HelpCentreHeader from '../components/HelpCentreHeader';
import '../css/HelpCentre.css';
import '../css/Login.css';
import { InputAdornment, TextField, IconButton, Grid, Button } from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import FlagIcon from '@mui/icons-material/Flag';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {UserManual, FaceAuthenticationTroubleshoot, ComputerSpecs, TermsAndConditions} from '../components/HelpCentrePages';
import SearchBar from '../components/SearchBar';

function HelpCentre() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleBackButtonClick = () => {
    setSelectedButton(null);
  };

  return (
    <div>
      <HelpCentreHeader/>
      <header className="help-centre-header">
        <h1 className="text">Sentinel Help Centre</h1>
        <div>
            <SearchBar />
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
