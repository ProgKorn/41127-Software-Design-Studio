import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import jwt_decode from 'jwt-decode';

function ExamHistory() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const examId = 1;
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
    <div className="ExamHistory">
      <AdminHeader/>
      <h1>Exam History</h1>
			<Button component={Link} to={`/exam/${examId}`} variant="contained">
				Exam Page
			</Button>
    </div>
  );
}

export default ExamHistory;
