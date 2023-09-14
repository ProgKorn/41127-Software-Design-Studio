import React from 'react';
import AdminHeader from '../components/AdminHeader';
import { Grid } from '@mui/material';
import Card from '../components/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../css/AdminPages.css';

function Flag() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3)
  ];

  const columns = [
    'Examinee', 'Student Id', 'Flags', 'Duration', 'Status'
  ]

  return (
    <div className="Flag">
      <AdminHeader/>
      <h1>Flag Details</h1>
      <Grid container spacing={2} columns={16} >
        <Grid item xs={8}>
          <Card title={"Examinee"} half>
            <div style={{ display: 'flex'}}>
              <div style={{ width: '70%'}}>
                <div style={{width: '100%', display:'flex', fontFamily: 'Montserrat, sans-serif',  borderBottom: 'solid 1px rgb(223, 223, 223)',
                  alignContent: 'space-between'}}>
                  <div style={{width: '30%', fontWeight: 'bold', backgroundColor: 'rgb(245, 247, 253)', color: 'rgb(85, 89, 130)',
                  paddingTop: 10, paddingBottom: 10 }}>Type</div>
                  <div style={{width: '70%', paddingTop: 10, paddingBottom: 10 }}>Description</div>
                </div>
                <div style={{width: '100%', display:'flex', fontFamily: 'Montserrat, sans-serif',  borderBottom: 'solid 1px rgb(223, 223, 223)',
                  alignContent: 'space-between'}}>
                  <div style={{width: '30%', fontWeight: 'bold', backgroundColor: 'rgb(245, 247, 253)', color: 'rgb(85, 89, 130)',
                  paddingTop: 10, paddingBottom: 10 }}>Type</div>
                  <div style={{width: '70%', paddingTop: 10, paddingBottom: 10 }}>Description</div>
                </div>
              </div>
              <div style={{ height: 250, width: '30%', backgroundColor: 'aliceblue', margin: 20, borderRadius: 10}}></div>
            </div>
          </Card>
          <Card title={"Exam Details"} half>
            <div style={{width: '100%', display:'flex', fontFamily: 'Montserrat, sans-serif',  borderBottom: 'solid 1px rgb(223, 223, 223)',
            alignContent: 'space-between'}}>
              <div style={{width: '30%', fontWeight: 'bold', backgroundColor: 'rgb(245, 247, 253)', color: 'rgb(85, 89, 130)',
            paddingTop: 10, paddingBottom: 10 }}>Type</div>
              <div style={{width: '70%', paddingTop: 10, paddingBottom: 10 }}>Description</div></div>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card title={"Flag Report"}>
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
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.calories}</TableCell>
                        <TableCell align="center">{row.fat}</TableCell>
                        <TableCell align="center">{row.carbs}</TableCell>
                        <TableCell align="center">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div style={{ height: 400, width: '80%', margin: 'auto', backgroundColor: 'aliceblue', 
              borderRadius: 10, marginTop: 40 }}></div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Flag;
