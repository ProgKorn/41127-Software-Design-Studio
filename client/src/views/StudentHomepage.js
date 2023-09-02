import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Exam.css';
import '../css/StudentView.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentHeader from '../components/StudentHeader';


function createData(name, value) {
  return { name, value };
}

function createData2(examName, examStart, details, seatNo, accessExam) {
  return {examName, examStart, details, seatNo, accessExam };
}

const rows = [
  createData('Full Name:', 'John Doe'),
  createData('Student ID:', '123456789'),
  createData('Email:', 'test@gmail.com'),
  createData('Institution:', 'UTS'),
  createData('Time Zone:', 'Sydney')
]

const rows2 = [
  createData2('SDS 31274 Finals', '21/08/2023 3:00:00', 'Language: English', '13', 'ACCESS'),
  createData2('SDS 31274 Finals', '21/08/2023 3:00:00', 'Language: English', '13', 'ACCESS'),
]

function StudentHomepage() {
  return (
    <div>
      <StudentHeader/>
      <div className="main">
        <h1>Student Homepage</h1>
      <div class = 'parent' style = {{display: 'flex'}}>
        <div class = 'child'>
        <div className="title">
          <h2>Student Details</h2>
          <div style={{ width: '120%'}}>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">

            <TableBody>
                {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  
      </div>
      </div>
      <div className="button-container" style={{ marginTop: '20px', textAlign:'left', width: '400px', marginRight: '30px'}}>
        <Link to="/editDetails" className="button" style={{ fontSize: '14px', padding: '5px 10px'}}>
          Edit Details
        </Link>
      </div>
      </div>
    <div class = 'child' style = {{marginLeft: '10%'}} >
    <div className="title">
        <h2>Upcoming Exams Scheduled</h2>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Exam Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Exam Start</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Details</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Seat No.</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} align="center">Access Exam</TableCell>
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
                <TableCell align="center">
                    <Link to="/examStart" className="button" style={{ fontSize: '12px', width:'120px', display:'inline-flex', textAlign:'center'}}>
                      Access Exam
                    </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        </div>
    </div>
    </div>
    
    <div className="title">
        <h2>Test Your Equipment</h2>
        <div className='testEquipment'>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">It is highly advised that you check your computer system you are using beforehand to ensure a smooth online testing experience.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell align="center"> <div className="button-container" style={{width:'100%', height:'10vh', marginLeft:'0px', marginTop:'0px'}}>
        <Link to="/testEquipment" className="studentButton" align = 'left'>
          Test Your Equipment
        </Link>
      </div></TableCell>
              </TableRow>
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    </div>
    </div>
    </div>
  );
}

export default StudentHomepage;
