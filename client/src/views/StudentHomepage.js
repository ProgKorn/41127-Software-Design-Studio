import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Exam.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function createData(name, value) {
  return { name, value };
}

function createData2(examName, examStart, details, seatNo, accessExam) {
  return {examName, examStart, details, seatNo, accessExam };
}

const rows = [
  createData('Full Name', 'John Doe'),
  createData('Student ID', '123456789'),
  createData('Email', 'test@gmail.com'),
  createData('Institution', 'UTS'),
  createData('Time Zone', 'Sydney')
]

const rows2 = [
  createData2('SDS 31274 Finals', '21/08/2023 3:00:00', 'Language: English', '13', 'ACCESS'),
  createData2('SDS 31274 Finals', '21/08/2023 3:00:00', 'Language: English', '13', 'ACCESS'),
]

function StudentHomepage() {
  return (
    <div className="main">
      <h1>Student Homepage</h1>
      <div className="title">
        <h2>Student Details</h2>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableBody>
              {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>  
    </div>
      <div className="button-container">
        <Link to="/editDetails" className="button">
          Edit Details
        </Link>
      </div>

    <div className="title">
        <h2>Upcoming Exam Scheduled</h2>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Exam Name</TableCell>
            <TableCell align="center">Exam Start</TableCell>
            <TableCell align="center">Details</TableCell>
            <TableCell align="center">Seat No.</TableCell>
            <TableCell align="center">Access Exam</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.examName}
              </TableCell>
              <TableCell align="center">{row.examStart}</TableCell>
              <TableCell align="center">{row.details}</TableCell>
              <TableCell align="center">{row.seatNo}</TableCell>
              <TableCell align="center">{row.accessExam}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}

export default StudentHomepage;
