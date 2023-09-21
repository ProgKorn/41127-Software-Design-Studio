import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import '../css/NavBar.css';
import logo from '../SentinelV1.svg';

function ResponsiveAppBar({routes, type}) {
  const pages = Object.keys(routes);

  const getAppBarContent = () => {
    switch (type) {

      case 'signIn':
        return (
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button component={Link} to='/'>
                  <img src={logo} className="Mini-logo" alt="Logo" />
                </Button>
                <div> {/* Spacer */}
                  <Button component={Link} to="/helpcentre" color="inherit">
                    Help Centre
                  </Button>
                  <span style={{ margin: '0 30px '}}></span>
                  <Button
                    component={Link}
                    to="https://www.uts.edu.au/current-students/support"
                    color="inherit"
                  >
                    Contact Us
                  </Button>
                </div>
              </Toolbar>
            </AppBar>
          </Box>
        );

        case 'helpCentre':
          return (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button component={Link} to='/'>
                    <img src={logo} className="Mini-logo" alt="Logo" />
                  </Button>
                  <div> {/* Spacer */}
                    <Button component={Link} to="/login" color="inherit">
                      Sign In
                    </Button>
                    <span style={{ margin: '0 30px '}}></span>
                    <Button
                      component={Link}
                      to="https://www.uts.edu.au/current-students/support"
                      color="inherit"
                    >
                      Contact Us
                    </Button>
                  </div>
                </Toolbar>
              </AppBar>
            </Box>
          );

        case 'admin':
          return (
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  {(
                    //replace below typography component with logo
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      LOGO
                    </Typography>
                  )}
                  <Box 
                    justifyContent="center"
                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                      {pages.map((page) => (
                      <Button key={page} component={Link} to={routes[page]}
                        sx={{ my: 3, color: 'white', display: 'block' }}>
                        {page}
                      </Button>
                      ))}
                  </Box>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={null} sx={{ p: 0 }}>
                      {/* Add the user's name under 'alt' to change letter profile image */}
                      <Avatar alt="Anonymous" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                    </Tooltip>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          );

      default:
        return <AppBar/>;
    }
  }
  return (
    getAppBarContent()
  );
}
export default ResponsiveAppBar;