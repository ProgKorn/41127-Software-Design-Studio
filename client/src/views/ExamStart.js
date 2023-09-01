import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Exam.css';

function createData(name, value) {
  return { name, value };
}

const rows = [
  createData('Type', 'Live'),
  createData('Term', 'Spring'),
  createData('Exam Start', '9:00:00'),
  createData('Exam End', '11:00:00'),
  createData('Duration', '2 hours')
]

function ExamStart() {
  return (
    <div className="main">
      {/* Title */}
      <div className="title">
        <h1 >Exam Start</h1>
      </div>
      {/* Exam detail section */}
      <div className="details">
        <div>
          <h2 >Exam Details</h2>
        </div>
        {/* Details table goes here */}
        <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {/* <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead> */}
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
      </div>
    </div>
  );
}

export default ExamStart;
