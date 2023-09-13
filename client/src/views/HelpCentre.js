import React from 'react';
import HelpCentreHeader from '../components/HelpCentreHeader';
import '../css/HelpCentre.css'
import '../css/Login.css';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import {IconButton, Grid, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import BuildIcon from '@mui/icons-material/Build';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import AssignmentIcon from '@mui/icons-material/Assignment';

function Search() {
  //search documentation logic
}

function HelpCentre() {
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
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1 }}>
						<Grid item xs={3}>
							<Button component={Link} to="" className="helpDashboardButton" variant="contained">
								<div className="helpDashboardIcons"><AssignmentIcon/></div>
								User Manual
							</Button>
						</Grid>
						<Grid item xs={3}>
							<Button component={Link} to="" className="helpDashboardButton" variant="contained">
							<div className="helpDashboardIcons"><FaceRetouchingOffIcon/></div>
								Face Auth Troubleshoot?
							</Button>
						</Grid>
						<Grid item xs={3}>
							<Button component={Link} to="" className="helpDashboardButton" variant="contained">
								<div className="helpDashboardIcons"><BuildIcon/></div>
								PC Min Specs?
							</Button>
						</Grid>
						<Grid item xs={3}>
							<Button component={Link} to="" className="helpDashboardButton" variant="contained">
								<div className="helpDashboardIcons"><AssignmentLateIcon/></div>
								Terms and Conditions
              </Button>
						</Grid>
					</Grid>
      {/* <div className="qna-section">
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
      </div> */}
    </div>
  );
}

export default HelpCentre;
