import React from 'react';
import ResponsiveAppBar from './NavBar';

function AdminHeader() {
  const adminRoutes = {
	  Home: '/admindashboard',
	  Schedule: '/schedule',
	  Activity: '/flaglog',
	}

  return (
    <div>
      <ResponsiveAppBar routes={adminRoutes}/>
      <div className="AdminHeader"></div>
    </div>
  );
}

export default AdminHeader;