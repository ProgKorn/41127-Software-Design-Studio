import React, { useEffect, useState } from 'react';
import HelpCentreHeader from '../components/HelpCentreHeader';
import '../css/HelpCentre.css';
import '../css/Login.css';
import { InputAdornment, TextField, IconButton, Grid, Button } from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import FlagIcon from '@mui/icons-material/Flag';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {UserManual, FaceAuthenticationTroubleshoot, Flagging, TermsAndConditions} from '../components/HelpCentrePages';
import SearchBar from '../components/SearchBar';
import { Introduction, Overview, GettingStarted, UsingTheSoftware, Troubleshooting} from "../components/UserManual";
import jwt_decode from 'jwt-decode';
import AdminHeader from '../components/AdminHeader';
import StudentHeader from '../components/StudentHeader';


function HelpCentre() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isStudent, setIsStudent] = useState(null);

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

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(true);
      } else {
        setIsStudent(true);
      }
    } catch (error) {
      
    }
  }, []);  

  const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    backgroundColor: "#292E64",
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    '&:hover': {
      backgroundColor: '#a03421'
    },
  }

  return (
    <div>
      {!isStudent && !isAdmin && (
        <HelpCentreHeader/>
      )}
      {!isStudent && isAdmin && (
        <AdminHeader />
      )}
      {isStudent && !isAdmin && (
        <StudentHeader />
      )}
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
      <Flagging onBackButtonClick={handleBackButtonClick} />
      )}
      {selectedButton === 'termsAndConditions' && (
      <TermsAndConditions onBackButtonClick={handleBackButtonClick} />
      )}
      {selectedSection === 'userIntroduction' && <Introduction onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'userOverview' && <Overview onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'userGettingStarted' && <GettingStarted onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'userSoftware' && <UsingTheSoftware onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'userTroubleshooting' && <Troubleshooting onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'faceAuth' && <FaceAuthenticationTroubleshoot onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'flags' && <Flagging onBackButtonClick={handleBackButtonClick} />}
      {selectedSection === 'termsAndConds' && <TermsAndConditions onBackButtonClick={handleBackButtonClick} />}
    </div>
  );
}

export default HelpCentre;
