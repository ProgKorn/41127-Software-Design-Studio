import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { Button, Grid, Chip } from "@mui/material";
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
import StatusChip from "../components/StatusChip";
import axios from "axios";
import Card from "../components/Card";
import jwt_decode from "jwt-decode";

function createData(session, examinee, flag, status, flag_no, session_no) {
  return { session, examinee, flag, status, flag_no, session_no };
}

const rows = [
  createData("Student 1", 159, 6.0, "Resolved", 4.0, 1),
  createData("Student 2", 237, 9.0, "Pending", 4.3, 1),
  createData("Student 3", 262, 16.0, "Terminated", 6.0, 1),
  createData("Student 4", 305, 3.7, "Resolved", 4.3, 1),
  createData("Student 5", 356, 16.0, "Terminated", 3.9, 1),
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
  const [flagList, setFlags] = React.useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/flag/getAllFlags")
      .then((flagList) => {
        setFlags(flagList.data)
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/flag/getAllFlags",{
  //       method: "GET",
  //     })
  //     .then((res) => setFlags(res.json))
  //     .then(data =>{
  //       HTMLFormControlsCollection.log(data, "flagData");
  //     });
  // }, []);



  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(true);
      } else {
        navigate("/noaccess");
      }
    }
  }, [isAdmin, navigate]);

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
                {flagList.map((flag) => (
                  <TableRow>
                    <TableCell align="center">{flag.sessionName}</TableCell>
                    <TableCell align="center">{flag.studentId}</TableCell>
                    <TableCell align="center">{flag.description}</TableCell>
                    {/* <TableCell align="center" className={"label label-"+flag.status}>{flag.status}</TableCell> */}
                    {/* <TableCell align="center">
                      <Chip
                        label={flag.status}
                      />
                    </TableCell> */}
                    <TableCell align="center">
                      <StatusChip status={flag.status} />
                    </TableCell>
                    <TableCell align="center">{flag.flagId}</TableCell>
                    <TableCell align="center">{flag.examId}</TableCell>
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
