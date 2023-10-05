import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import AdminHeader from '../components/AdminHeader';

function ManageClasses() {
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
			<div className="manageClasses">
				<h1>Manage Classes</h1>
			</div>
	</div>
  );
}

export default ManageClasses;
