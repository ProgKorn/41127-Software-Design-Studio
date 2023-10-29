import React from 'react';
import ResponsiveAppBar from './NavBar';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HelpIcon from '@mui/icons-material/Help';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import HelpIcon from '@mui/icons-material/Help';

function AdminHeader({hideHelpRoute}) {
  let adminRoutes = {
	  Home: '/admin',
	  Schedule: '/schedule',
	  Activity: '/flaglog',
    // Help: '/helpcentre',
	};

  let AdminIcons = {
	  Home: <HomeRoundedIcon style={{width: 35, height: 30}} />,
	  Schedule: <EventNoteRoundedIcon style={{width: 35, height: 30}} />,
	  Activity: <FlagRoundedIcon style={{width: 35, height: 30}} />,
    // Help: <HelpIcon style={{width: 35, height: 30}} />,
	}

  if (!hideHelpRoute) {
    adminRoutes.Help = '/helpCentre';
    AdminIcons.Help = <HelpIcon style={{width: 35, height: 30}} />;
  }

  return (
    <div>
      <ResponsiveAppBar routes={adminRoutes} type='admin' icons={AdminIcons} hideHelpRoute={hideHelpRoute}/>
      <div className="AdminHeader"></div>
    </div>
  );
}

export default AdminHeader;