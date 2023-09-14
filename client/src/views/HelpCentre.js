import React, { useState } from 'react';
import HelpCentreHeader from '../components/HelpCentreHeader';
import '../css/HelpCentre.css';
import '../css/Login.css';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import {IconButton, Grid, Button} from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import BuildIcon from '@mui/icons-material/Build';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {UserManual, FaceAuthenticationTroubleshoot, ComputerSpecs, TermsAndConditions} from '../components/HelpCentrePages';

function Search() {
  //search documentation logic
}

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
            <TextField
             variant="filled"
             label="Search..."
             className="searchBox"
            //  helperText="Your search returned 0 items"
             InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => {
                    Search()
                  }}>
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
              ),
             }}
            />
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
							<Button className="helpDashboardButton" variant="contained" onClick={() => handleButtonClick('pcMinSpecs')}>
								<div className="helpDashboardIcons"><BuildIcon/></div>
								PC Min Specs?
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
      {selectedButton === 'pcMinSpecs' && (
      <ComputerSpecs onBackButtonClick={handleBackButtonClick} />
      )}
      {selectedButton === 'termsAndConditions' && (
      <TermsAndConditions onBackButtonClick={handleBackButtonClick} />
      )}
    </div>
  );
}

export default HelpCentre;
