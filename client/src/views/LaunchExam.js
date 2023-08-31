import React from 'react';
import AdminHeader from '../components/AdminHeader';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import '../css/Common.css';
import '../css/LaunchExam.css';

function LaunchExam() {
	return (
		<div>
			<AdminHeader/>
			<div className="launchExam">
				<h1>Launch Exam</h1>
			</div>
    </div>
  );
}

export default LaunchExam;
