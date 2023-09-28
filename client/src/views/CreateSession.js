import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import jwt_decode from 'jwt-decode';

function CreateSession() {
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
		<div>
			<AdminHeader/>
			<div className="createSession">
				<h1>Create Session</h1>
			</div>
    </div>
  );
}

export default CreateSession;