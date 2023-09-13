import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import logo from '../SentinelV1.svg'

export default function HelpCentreHeader() {
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
  }
