import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import '../css/Exam.css';
import '../css/StudentView.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentHeader from '../components/StudentHeader';
 
function createData (examName,  examStart, details, seatNo, finishTime) {
    return{examName, examStart, details, seatNo, finishTime};
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#2b2d42',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: 'Montserrat, sans-serif',
      textTransform: "capitalize",
    },
    [`&.${tableCellClasses.body}`]: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '15px'
    }
  }));
  
  const rows = [
    createData('SDS 31274 Finals', '21/08/2023 3:00:00', 'Language: English', '13', '21/08/2023 5:00:00'),
    createData('SDS 31274 Finals', '21/08/2023 3:00:00', 'Language: English', '13', '21/08/2023 5:00:00'),
  ]

function PreviousExams(){
    return(
        <div>
        <StudentHeader/>
        <header class = "student-header">
            <div className="student-heading">Student Homepage</div>
        </header>
            <div style={{width:'80%', marginLeft:'50px', marginTop:'30px'}}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 200}} aria-label="customised table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell colspan={5}>View Previous Exams</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                                <StyledTableCell style={{ fontWeight: 'bold' }} align="left">Exam Name</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Exam Start</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Details</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Seat No.</StyledTableCell>
                                <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Exam Finish Time</StyledTableCell>
                            </TableRow>
                            {rows.map((row) => (
                            <TableRow 
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                {row.examName}
                                </TableCell>
                                <StyledTableCell align="center">{row.examStart}</StyledTableCell>
                                <StyledTableCell align="center">{row.details}</StyledTableCell>
                                <StyledTableCell align="center">{row.seatNo}</StyledTableCell>
                                <StyledTableCell align="center">{row.finishTime}</StyledTableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    <Link to="/studenthomepage" className="student-button" style={{ width:'115px', align:'left', textAlign:'center', marginTop:'20px'}}>
                        Back
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default PreviousExams;