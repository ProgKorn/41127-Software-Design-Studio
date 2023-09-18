import React from 'react';
import { Grid } from '@mui/material';
import AdminHeader from '../components/AdminHeader';
import Card from '../components/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../css/AdminPages.css';


function Exam() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const columns = [
    'Examinee', 'Student Id', 'Flags', 'Duration', 'Status'
  ]
  
  return (
    <div className="Exam">
      <AdminHeader/>
      <h1>Exam Details</h1>
      <Grid container spacing={2} columns={16} style={{ paddingLeft: 30, paddingRight: 30}} >
        <Grid item xs={8}>
          <Card title={"Examination Details"}>
            <div style={{width: '100%', display:'flex', fontFamily: 'Montserrat, sans-serif',  borderBottom: 'solid 1px rgb(223, 223, 223)',
            alignContent: 'space-between'}}>
              <div style={{width: '30%', fontWeight: 'bold', backgroundColor: 'rgb(245, 247, 253)', color: 'rgb(85, 89, 130)',
            paddingTop: 10, paddingBottom: 10 }}>Type</div>
              <div style={{width: '70%', paddingTop: 10, paddingBottom: 10 }}>Description</div></div>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card title={"Examinees & Recordings"}>
          <TableContainer style={{fontFamily: 'Montserrat, sans-serif'}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ fontSize: '0.8rem', fontWeight:700}}>
                  <TableRow >
                    {columns.map((col) => (
                      <TableCell  align='center' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, 
                      color: 'rgb(85, 89, 130)',  }}>{col}</TableCell>
                    ))}
                    {/* <TableCell sx={{ fontFamily: 'Montserrat, sans-serif' }}>Dessert (100g serving)</TableCell> */}
                    {/* <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <TableCell component="th" scope="row" style={{fontFamily: 'Montserrat, sans-serif'}}>
                        {row.name}
                      </TableCell>
                      <TableCell align="center" style={{fontFamily: 'Montserrat, sans-serif'}}>{row.calories}</TableCell>
                      <TableCell align="center" style={{fontFamily: 'Montserrat, sans-serif'}}>{row.fat}</TableCell>
                      <TableCell align="center" style={{fontFamily: 'Montserrat, sans-serif'}}>{row.carbs}</TableCell>
                      <TableCell align="center" style={{fontFamily: 'Montserrat, sans-serif'}}>{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Exam;