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

function ResponsiveAppBar({routes}) {
  const pages = Object.keys(routes);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Replace below 'typography' component with the logo of image */}
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
}
export default ResponsiveAppBar;