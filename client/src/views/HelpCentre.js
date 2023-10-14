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
import { Introduction, Overview, GettingStarted, UsingTheSoftware, Troubleshooting} from "../components/UserManual";


function HelpCentre() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const handleSelectedSection = (section) => {
    setSelectedSection(section);
    setSelectedButton(null);
  }

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setSelectedSection(null);
  };

  const handleBackButtonClick = () => {
    setSelectedButton(null);
    setSelectedSection(null);
  };
  

  const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    backgroundColor: "#292E64",
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
  }

  return (
    <div>
      <HelpCentreHeader/>
      <header className="help-centre-header">
        <h1 className="text">Sentinel Help Centre</h1>
        <div>
            <SearchBar onSelectSection={handleSelectedSection}/>
        </div>
      </header>
      {!selectedButton && !selectedSection && (
        <div className='help-dashboard'>
          <Grid container rowSpacing={8} columnSpacing={{ xs: 1 }}>
						<Grid item xs={6}>
							<Button className="helpDashboardButton" variant="contained" onClick={() => handleButtonClick('userManual')} sx={buttonStyles}>
								<div className="helpDashboardIcons"><AssignmentIcon/></div>
								User Manual
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className="helpDashboardButton" variant="contained" onClick={() => handleButtonClick('faceAuthTroubleshoot')} sx={buttonStyles}>
							<div className="helpDashboardIcons"><FaceRetouchingOffIcon/></div>
								Face Auth Troubleshoot?
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className="helpDashboardButton" variant="contained"onClick={() => handleButtonClick('flagging')} sx={buttonStyles}>
								<div className="helpDashboardIcons"><FlagIcon/></div>
								Flagging
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className="helpDashboardButton" variant="contained" onClick={() => handleButtonClick('termsAndConditions')} sx={buttonStyles}>
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
      {selectedSection === 'userIntroduction' && <Introduction onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'userOverview' && <Overview onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'Getting Started' && <GettingStarted onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'Using the Software' && <UsingTheSoftware onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'Troubleshooting' && <Troubleshooting onBackButtonClick={handleBackButtonClick} />}
    </div>
  );
}

export default HelpCentre;
