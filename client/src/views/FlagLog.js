import React, { useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import { Button, Grid, Chip  } from "@mui/material";
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
import "../css/AdminTables.css";
import axios from "axios";
import Card from "../components/Card";

function createData(session, examinee, flag, status, flag_no, session_no) {
  return { session, examinee, flag, status, flag_no, session_no };
}

const rows = [
  createData("Student 1", 159, 6.0, "active", 4.0, 1),
  createData("Student 2", 237, 9.0, "pending", 4.3, 1),
  createData("Student 3", 262, 16.0, "inactive", 6.0, 1),
  createData("Student 4", 305, 3.7, "active", 4.3, 1),
  createData("Student 5", 356, 16.0, "inactive", 3.9, 1),
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

function FlagLog() {
  const [flags, setFlags] = React.useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getFlagLog")
      .then((flags) => setFlags(flags.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <AdminHeader />
      <div class="adminTable">
        <Card title={"Flagged Incidents"}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Session</StyledTableCell>
                  <StyledTableCell align="center">Examinee</StyledTableCell>
                  <StyledTableCell align="center">Flag</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Flag No.</StyledTableCell>
                  <StyledTableCell align="center">Session No.</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((flag) => (
                  <TableRow>
                    <TableCell align="center">{flag.session}</TableCell>
                    <TableCell align="center">{flag.examinee}</TableCell>
                    <TableCell align="center">{flag.flag}</TableCell>
                    <TableCell align="center" className={"label label-"+flag.status}>{flag.status}</TableCell>
                    <TableCell align="center">{flag.flag_no}</TableCell>
                    <TableCell align="center">{flag.session_no}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </div>
  );
}

export default FlagLog;
