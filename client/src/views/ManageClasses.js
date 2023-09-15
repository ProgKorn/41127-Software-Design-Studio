import React, { useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../css/AdminViews.css";
import axios from "axios";


function createData(session, examinee, flag, status, flag_no, session_no) {
  return { session, examinee, flag, status, flag_no, session_no };
}

const exams = [
  createData("Student 1", 159, 6.0, 24, 4.0, 1),
  createData("Student 2", 237, 9.0, 37, 4.3, 1),
  createData("Student 3", 262, 16.0, 24, 6.0, 1),
  createData("Student 4", 305, 3.7, 67, 4.3, 1),
  createData("Student 5", 356, 16.0, 49, 3.9, 1),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 1148,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ManageClasses() {
  return (
    <div className="ManageClasses">
      <AdminHeader />
      <div className="manageClassesPage">
        <div className="manageClassesPageHeader">
          <p style={{ paddingLeft: "20px", paddingTop: "15px" }}>
            Manage Classes
          </p>
        </div>

        <div className="manageClassesTable">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {exams.map((exam) => (
                  <TableRow>
                    <TableCell align="center">{exams.examinee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default ManageClasses;
