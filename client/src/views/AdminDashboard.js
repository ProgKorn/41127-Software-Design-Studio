import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import '../css/AdminDashboard.css';
import jwt_decode from 'jwt-decode';
import Clock from '../components/Clock';

function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(true);
      } else {
        navigate('/noaccess');
	    }
	  }
  }, [isAdmin, navigate]);

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
      <AdminHeader/>
      <div className="adminDashboard">
        <h1>Admin Dashboard</h1>
        <Clock />
        <div className="dashboardMenu">
          <Grid container rowSpacing={4} columnSpacing={{ xs: 1 }}>
            <Grid item xs={6}>
              <Button component={Link} to="/launchExam" sx={buttonStyles}
                className="dashboardButton" variant="contained">
                <div className="dashboardIcons">
                  <LaunchRoundedIcon />
                </div>
                <div>
                  Launch Exam
                </div>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button component={Link} to="/createSession" sx={buttonStyles}
                className="dashboardButton" variant="contained">
              <div className="dashboardIcons">
                <AddBoxOutlinedIcon />
              </div>
              <div>
                Create Exam
              </div>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button component={Link} to="/manageClasses" sx={buttonStyles}
                className="dashboardButton" variant="contained">
                <div className="dashboardIcons">
                  <GroupsOutlinedIcon />
                </div>
                <div>
                  Manage Classes
                </div>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button component={Link} to="/examhistory" sx={buttonStyles}
                className="dashboardButton" variant="contained">
                <div className="dashboardIcons">
                  <CollectionsBookmarkOutlinedIcon />
                </div>
                <div>
                  Exam History
                </div>
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
