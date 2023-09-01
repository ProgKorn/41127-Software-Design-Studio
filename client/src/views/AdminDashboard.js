import React from 'react';
import AdminHeader from '../components/AdminHeader';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import '../css/AdminDashboard.css';

function AdminDashboard() {
	return (
		<div>
			<AdminHeader/>
			<div className="adminDashboard">
				<h1>Admin Dashboard</h1>
				<div className="dashboardMenu">
					<Grid container rowSpacing={4} columnSpacing={{ xs: 1 }}>
						<Grid item xs={6}>
							<Button component={Link} to="/launchExam" className="dashboardButton" variant="contained">
								<div className="dashboardIcons"><LaunchRoundedIcon /></div>
								Launch Exam
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button component={Link} to="/createSession" className="dashboardButton" variant="contained">
							<div className="dashboardIcons"><AddBoxOutlinedIcon /></div>
								Create Session
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button component={Link} to="/manageClasses" className="dashboardButton" variant="contained">
								<div className="dashboardIcons"><GroupsOutlinedIcon /></div>
								Manage Classes
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button component={Link} to="/examhistory" className="dashboardButton" variant="contained">
								<div className="dashboardIcons"><CollectionsBookmarkOutlinedIcon /></div>
								Exam History</Button>
						</Grid>
					</Grid>
				</div>
			</div>
    </div>
  );
}

export default AdminDashboard;
