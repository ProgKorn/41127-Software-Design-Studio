import React from 'react';
import ResponsiveAppBar from './NavBar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HelpIcon from '@mui/icons-material/Help';

function StudentHeader({hideHelpRoute}) {
  let studentRoutes = {
	  Home: '/studenthomepage',
	  // Help: '/helpcentre',
	}

  let StudentIcons = {
	  Home: <HomeRoundedIcon style={{width: 35, height: 30}} />,
	  Signout: <ExitToAppIcon style={{width: 35, height: 30}} />,
	  // Help: <HelpIcon style={{width: 35, height: 30}} />,
	}

  if (!hideHelpRoute) {
    studentRoutes.Help = '/helpCentre';
    StudentIcons.Help = <HelpIcon style={{width: 35, height: 30}} />;
  }

  return (
    <div>
      <ResponsiveAppBar routes={studentRoutes} type='admin' icons={StudentIcons} hideHelpRoute={hideHelpRoute}/>
      <div className="StudentHeader"></div>
    </div>
  );
}

export default StudentHeader;