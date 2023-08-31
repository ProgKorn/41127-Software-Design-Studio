import React from 'react';
import AdminHeader from '../components/AdminHeader';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import '../css/Common.css';

function ManageClasses() {
	return (
		<div>
			<AdminHeader/>
			<div className="manageClasses">
				<h1>Manage Classes</h1>
			</div>
    </div>
  );
}

export default ManageClasses;
