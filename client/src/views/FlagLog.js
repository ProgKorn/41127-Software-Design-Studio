import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import jwt_decode from 'jwt-decode';

function FlagLog() {
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
