import React from 'react';
import AdminHeader from '../components/AdminHeader';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';

function FlagLog() {
	return (
		<div className="FlagLog">
			<AdminHeader/>
			<h1>Flag Log</h1>
			<Button component={Link} to="/flag" variant="contained" startIcon={<FlagRoundedIcon/>}>
				Flag Page
			</Button>
		</div>
	);
}

export default FlagLog;
