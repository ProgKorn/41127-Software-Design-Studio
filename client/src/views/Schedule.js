import React from 'react';
import AdminHeader from '../components/AdminHeader';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import '../css/AdminPages.css';

function Schedule() {
  const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    // backgroundColor: "#8d99ae"
  }
  return (
		<div className="Schedule">
			<AdminHeader/>
			<h1>Exam Schedule</h1>
			<div style={{ paddingLeft: 40, paddingRight: 40 }}>
				<Card title={"Upcoming Examinations"}>
					<div style={{ display: 'flex', height: 660 }}>
						<div style={{ width: '30%'}}>
              <div style={{ fontWeight: 'bold', padding: 20, paddingTop: 40, paddingLeft: 30, fontFamily: 'Montserrat, sans-serif', textAlign: 'left', fontSize: '1.2rem' }}>
                Today (18/09/2023)
              </div>
              <div style={{padding: 20, paddingLeft: 30, fontFamily: 'Montserrat, sans-serif', textAlign: 'left', fontSize: '1.2rem',
                border: 'solid 1px rgb(223, 223, 223)', borderRadius: 20, margin: 20, marginTop: 0 }}>
                <div style={{ fontWeight: 'bold', padding: 10 }}>
                  Software Design Studio 31274 Finals</div>
                <div style={{ padding: 10 }}>
                  3:00PM - 4:00PM</div>
                <div style={{ padding: 10, paddingTop: 0 }}>
                  Session ID: 2138342</div>
              </div>
						</div>
						<div style={{ width: '70%', height: 660, borderBottomRightRadius: 10, paddingLeft: 150, paddingTop: 80, textAlign: 'left', fontFamily: 'Montserrat, sans-serif', borderLeft: 'solid 1px rgb(223, 223, 223)' }}>
              <div style={{ fontWeight: 'bold',  fontSize: '1.8rem'}}>
                Software Design Studio 31274 Finals</div>
              <div style={{ paddingTop: 40, fontSize: '1.3rem' }}>
                3:00PM - 4:00PM</div>
              <div style={{ paddingTop: 20, fontSize: '1.3rem' }}>
                Session ID: 2138342</div>
              <div style={{ paddingTop: 20 }}>
              <a href='/exam' style={{ color: 'blue',  fontSize: '1.3rem' }}>Show Exam Details</a></div>
              <div style={{ display: 'flex', paddingTop: 80, gap: 40, overflow: 'auto' }}>
                <Button component={Link} to="/launchExam" sx={buttonStyles} className="scheduleButton" variant="contained">
                  <div className="scheduleIcons"><LaunchRoundedIcon /></div>
                  <div style={{ fontSize: '1rem', paddingTop: 15 }}>Launch</div>
                </Button>
                <Button component={Link} to="/manageClasses" sx={buttonStyles}className="scheduleButton" variant="contained">
                  <div className="scheduleIcons"><GroupsOutlinedIcon /></div>
                  <div style={{ fontSize: '1rem', paddingTop: 15 }}>View Class</div>
              </Button>
              <Button component={Link} sx={buttonStyles} className="scheduleButton" variant="contained">
                  <div className="scheduleIcons"><ModeEditOutlinedIcon /></div>
                  <div style={{ fontSize: '1rem', paddingTop: 15 }}>Edit</div>
                </Button>
                <Button component={Link} sx={buttonStyles}className="scheduleButton" variant="contained">
                  <div className="scheduleIcons"><DeleteOutlineOutlinedIcon /></div>
                  <div style={{ fontSize: '1rem', paddingTop: 15 }}>Delete</div>
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