import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
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
import Card from "../components/Card";
import axios from "axios";
import jwt_decode from 'jwt-decode';

function createData(examName, term, examiner, attendance, examStart, examEnd, status, sessionNo) {
  return { examName, term, examiner, attendance, examStart, examEnd, status, sessionNo };
}

const exams = [
  createData("Exam 1", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 2", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 3", "Autumn 2023", "Dr. Barbie", "13", "dateTime", "dateTime", "live", "123"),
  createData("Exam 4", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 5", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 1", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 2", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 3", "Autumn 2023", "Dr. Barbie", "13", "dateTime", "dateTime", "live", "123"),
  createData("Exam 4", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 5", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 1", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 2", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 3", "Autumn 2023", "Dr. Barbie", "13", "dateTime", "dateTime", "live", "123"),
  createData("Exam 4", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 22", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 1", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 2", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 3", "Autumn 2023", "Dr. Barbie", "13", "dateTime", "dateTime", "live", "123"),
  createData("Exam 4", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 5", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 1", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 2", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 3", "Autumn 2023", "Dr. Barbie", "13", "dateTime", "dateTime", "live", "123"),
  createData("Exam 4", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 5", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 1", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 2", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
  createData("Exam 3", "Autumn 2023", "Dr. Barbie", "13", "dateTime", "dateTime", "live", "123"),
  createData("Exam 4", "Autumn 2023", "Dr. Barbie", "33", "dateTime", "dateTime", "live", "123"),
  createData("Exam 22", "Autumn 2023", "Dr. Barbie", "23", "dateTime", "dateTime", "live", "123"),
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

function ExamHistory() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const examId = 1;
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(true);
      } else {
        navigate('/noaccess'); 
	    }
	  }
  }, [isAdmin, navigate]);

  return (
    <div className="ExamHistory">
      <AdminHeader />
      <div className="adminTable">
        <Card title={"Exam History"}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Exam Name</StyledTableCell>
                  <StyledTableCell align="center">Term</StyledTableCell>
                  <StyledTableCell align="center">Examiner</StyledTableCell>
                  <StyledTableCell align="center">Attendance</StyledTableCell>
                  <StyledTableCell align="center">Exam Start</StyledTableCell>
                  <StyledTableCell align="center">Exam End</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Session #</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow>
                    <TableCell align="center">{exam.examName}</TableCell>
                    <TableCell align="center">{exam.term}</TableCell>
                    <TableCell align="center">{exam.examiner}</TableCell>
                    <TableCell align="center">{exam.attendance}</TableCell>
                    <TableCell align="center">{exam.examStart}</TableCell>
                    <TableCell align="center">{exam.examEnd}</TableCell>
                    <TableCell align="center">{exam.status}</TableCell>
                    <TableCell align="center">{
                      <a href={`/exam/${examId}`} style={{ color: 'black' }}>
                        {exam.sessionNo}
                      </a>
                 }</TableCell>
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

export default ExamHistory;