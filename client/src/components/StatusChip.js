import React from 'react';
import { Chip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
  palette: {
    warning: {
      main: '#FCF3CA'
    },
    success: {
      main: '#DBECD8'
    },
    error: {
      main: '#F9E3E2'
    },
  },
});

function colorForStatus(status) {
  switch (status) {
    case 'Resolved':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Terminated':
      return 'error';
    default:
      return grey;
  }
}

function textColorForStatus(status) {
  switch (status) {
    case 'Resolved':
      return '#558F4B';
    case 'Pending':
      return '#EDBD56';
    case 'Terminated':
      return '#EC6235';
    default:
      return grey;
  }
}

function iconForStatus(status) {
    switch (status) {
      case 'Resolved':
        return <DoneIcon />;
      case 'Pending':
        return <AccessTimeIcon />;
      case 'Terminated':
        return <CloseIcon />;
      default:
        return grey;
    }
  } 

function StatusChip({ status }) {
  return (
    <ThemeProvider theme={theme}>
      <Chip
      style={{ 
        fontFamily: 'Montserrat, sans-serif',
        color: textColorForStatus(status),
        fontWeight: 'bold'
      }}
      icon={iconForStatus(status)}
      label={status}
      color={colorForStatus(status)}
      />
    </ThemeProvider>
  );
}

export default StatusChip;
