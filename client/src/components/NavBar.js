import React, { useEffect, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import '../css/NavBar.css';
import logo from '../SentinelV1White.svg';
import { Menu, MenuItem } from '@mui/material';

function ResponsiveAppBar({routes, type, icons}) {
  const pages = Object.keys(routes);

  const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "0.7rem",
    textTransform: 'Uppercase',
    color: 'white',
    display: 'inline-block', 
    padding: '1em 2em 1em 2em'
  }

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTimeInSeconds) {
        localStorage.removeItem('token');
        navigate('/login');
      } 
    }
  }, [navigate]);

  const [anchor, setAnchor] = useState(null);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
      }
      navigate('/login'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
            <AppBar position="static" sx={{ backgroundColor: "#2b2d42"}}>
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <Button component={Link} to='/'>
                    <img src={logo} className="Mini-logo" alt="Logo" />
                    <div style={{ fontFamily: 'Montserrat, sans-serif', color: 'white', paddingLeft: 10 }}>Sentinel</div>
                  </Button>
                  <Box 
                  style={{ paddingRight: 90}}
                    justifyContent="center"
                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                      {pages.map((page) => (
                        <Button key={page} component={Link} to={routes[page]} sx={buttonStyles}>
                          {icons && icons[page]}
                          <div style={{fontSize:"1.3em"}}>
                            {page}
                          </div>
                        </Button>
                      ))}
                  </Box>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open account settings">
                    <IconButton onClick={handleClick} sx={{ p: 0 }}>
                      {/* Add the user's name under 'alt' to change letter profile image */}
                      <Avatar alt="Anonymous" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                    </Tooltip>
                    <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
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