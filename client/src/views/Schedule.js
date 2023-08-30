import React from 'react';
import AdminHeader from '../components/AdminHeader';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Schedule() {
  return (
		<div className="Schedule">
			<AdminHeader/>
			<h1>Exam Schedule</h1>
			<Button component={Link} to="/exam" variant="contained">
				Exam Page
			</Button>
		</div>
  );
}

export default Schedule;