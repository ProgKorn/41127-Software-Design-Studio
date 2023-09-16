import React from "react";
import { Chip } from '@mui/material';
import { green, orange, grey, red } from "@mui/material/colors";
import DoneIcon from '@mui/icons-material/Done';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CloseIcon from '@mui/icons-material/Close';

function colorForStatus(status) {
  switch (status) {
    case "Active":
      return "success";
    case "Pending":
      return "warning";
    case "Inactive":
      return "error";
    default:
      return grey;
  }
}

function iconForStatus(status) {
    switch (status) {
      case "Active":
        return <DoneIcon />;
      case "Pending":
        return <PendingActionsIcon />;
      case "Inactive":
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
