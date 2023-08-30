import React from 'react';
import AdminHeader from '../components/AdminHeader';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function ExamHistory() {
	return (
    <div className="ExamHistory">
      <AdminHeader/>
      <h1>Exam History</h1>
			<Button component={Link} to="/exam" variant="contained">
				Exam Page
			</Button>
    </div>
  );
}

export default ExamHistory;
