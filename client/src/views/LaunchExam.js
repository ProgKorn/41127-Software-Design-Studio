import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import jwt_decode from 'jwt-decode';

function LaunchExam() {
	const [isAdmin, setIsAdmin] = useState(true);
	const navigate = useNavigate();
  
	useEffect(() => {
	  const token = localStorage.getItem('token');
	  if (token) {
		const decodedToken = jwt_decode(token);
		if (decodedToken.isAdmin === true) {
		  setIsAdmin(true);
		} else {
		  setIsAdmin(false);
		  navigate('/noaccess'); 
		  }
		}
	}, [isAdmin, navigate]);
	
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
