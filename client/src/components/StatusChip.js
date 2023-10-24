import React from "react";
import { Chip } from '@mui/material';
import { green, orange, grey, red } from "@mui/material/colors";
import DoneIcon from '@mui/icons-material/Done';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CloseIcon from '@mui/icons-material/Close';

function colorForStatus(status) {
  switch (status) {
    case "Resolved":
      return "success";
    case "Pending":
      return "warning";
    case "Terminated":
      return "error";
    default:
      return grey;
  }
}

function iconForStatus(status) {
    switch (status) {
      case "Resolved":
        return <DoneIcon />;
      case "Pending":
        return <PendingActionsIcon />;
      case "Terminated":
        return <CloseIcon />;
      default:
        return grey;
    }
  }
// && <DoneIcon style={{ color: "white" }}/> 
// 

function StatusChip({ status }) {
  return (
    <Chip
    icon={iconForStatus(status)}
    label={status}
    color={colorForStatus(status)}
    />
  );
}

export default StatusChip;
