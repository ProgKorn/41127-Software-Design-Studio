import React from 'react';
import ResponsiveAppBar from './NavBar';

function StudentHeader() {
  const studentRoutes = {
	  Home: '/studenthomepage',
	  Help: '/helpcentre',
	  Signout: '/login',
	}

  return (
    <div>
      <ResponsiveAppBar routes={studentRoutes} type='student'/>
      <div className="StudentHeader"></div>
    </div>
  );
}

export default StudentHeader;