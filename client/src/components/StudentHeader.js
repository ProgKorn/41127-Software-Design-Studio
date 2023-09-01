import React from 'react';
import ResponsiveAppBar from './NavBar';

function StudentHeader() {
  const studentRoutes = {
	  Home: '/',
	  Help: '/helpcentre',
	  Signout: '/login',
	}

  return (
    <div>
      <ResponsiveAppBar routes={studentRoutes}/>
      <div className="StudentHeader"></div>
    </div>
  );
}

export default StudentHeader;