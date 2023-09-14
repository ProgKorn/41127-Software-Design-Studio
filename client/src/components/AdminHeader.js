import React from 'react';
import ResponsiveAppBar from './NavBar';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';

function AdminHeader() {
  const adminRoutes = {
	  Home: '/admin',
	  Schedule: '/schedule',
	  Activity: '/flaglog',
	}

  const AdminIcons = {
	  Home: <HomeRoundedIcon style={{width: 35, height: 30}} />,
	  Schedule: <EventNoteRoundedIcon style={{width: 35, height: 30}} />,
	  Activity: <FlagRoundedIcon style={{width: 35, height: 30}} />,
	}

  return (
    <div>
      <ResponsiveAppBar routes={adminRoutes} icons={AdminIcons}/>
      <div className="AdminHeader"></div>
    </div>
  );
}

export default AdminHeader;