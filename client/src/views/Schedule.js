import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import '../css/AdminPages.css';
import jwt_decode from 'jwt-decode';

function Schedule() {
  const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    backgroundColor: "#292E64"
  }

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

  return (
		<div className="Schedule">
			<AdminHeader/>
			<h1>Exam Schedule</h1>
			<div className='pageCardPadding'>
				<Card title={"Upcoming Examinations"}>
					<div className='scheduleContainer'>
						<div style={{ width: '30%'}}>
              <div className='scheduleTitleSection'>
                Today (18/09/2023)
              </div>
              <div className='scheduleSmallCard'>
                <div style={{ fontWeight: 'bold', padding: 10 }}>
                  Software Design Studio 31274 Finals
                </div>
                <div style={{ padding: 10 }}>
                  3:00PM - 4:00PM
                </div>
                <div style={{ padding: 10, paddingTop: 0 }}>
                  Session ID: 2138342
                </div>
              </div>
						</div>
						<div className='scheduleLargeCard'>
              <div style={{ fontWeight: 'bold',  fontSize: '1.8rem'}}>
                Software Design Studio 31274 Finals
              </div>
              <div style={{ paddingTop: 40, fontSize: '1.3rem' }}>
                3:00PM - 4:00PM
              </div>
              <div style={{ paddingTop: 20, fontSize: '1.3rem' }}>
                Session ID: 2138342
              </div>
              <div style={{ paddingTop: 20 }}>
              <a href='/exam' style={{ color: 'blue',  fontSize: '1.3rem' }}>
                Show Exam Details</a></div>
              <div className='scheduleButtonContainer'>
                <Button component={Link} to="/launchExam" sx={buttonStyles} className="scheduleButton" variant="contained">
                  <div className="scheduleIcons">
                    <LaunchRoundedIcon />
                  </div>
                  <div className='scheduleButtonText'>
                    Launch
                  </div>
                </Button>
                <Button component={Link} to="/manageClasses" sx={buttonStyles}className="scheduleButton" variant="contained">
                  <div className="scheduleIcons">
                    <GroupsOutlinedIcon />
                  </div>
                  <div className='scheduleButtonText'>
                    View Class
                  </div>
              </Button>
              <Button component={Link} sx={buttonStyles} className="scheduleButton" variant="contained">
                  <div className="scheduleIcons">
                    <ModeEditOutlinedIcon />
                  </div>
                  <div className='scheduleButtonText'>
                    Edit
                  </div>
                </Button>
                <Button component={Link} sx={buttonStyles}className="scheduleButton" variant="contained">
                  <div className="scheduleIcons">
                    <DeleteOutlineOutlinedIcon />
                  </div>
                  <div className='scheduleButtonText'>
                    Delete
                  </div>
              </Button>
              </div>
						</div>
					</div>
				</Card>
			</div>
		</div>
  );
}

export default Schedule;