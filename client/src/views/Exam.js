import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import jwt_decode from 'jwt-decode';

function Exam() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

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

  function createData(name, stat1, stat2, stat3, stat4) {
    return { name, stat1, stat2, stat3, stat4 };
  }

  const rows = [
    createData('Student1', 159, 6.0, 24, 4.0),
    createData('Student2', 237, 9.0, 37, 4.3),
    createData('Student3', 262, 16.0, 24, 6.0),
    createData('Student4', 305, 3.7, 67, 4.3),
    createData('Student5', 356, 16.0, 49, 3.9),
  ];

  const columns = [
    'Examinee', 'Student Id', 'Flags', 'Duration', 'Status'
  ]

  const tableTitleTextStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700, 
    color: 'rgb(85, 89, 130)'
  }

  const tableRowStyle = {
    '&:last-child td, &:last-child th': { border: 0 },
    fontFamily: 'Montserrat, sans-serif'
  }
  
  return (
    <div className="Exam">
      <AdminHeader/>
      <h1>Exam Details</h1>
      <Grid container spacing={2} columns={16} className='pageCardPadding'>
        <Grid item xs={8}>
          <Card title={"Examination Details"}>
            <div className='listRowContainer'>
              <div className='listTitleText' style={{ width: '30%' }}>
                Type
              </div>
              <div className='listDescriptionText' style={{ width: '70%' }}>
                Description
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card title={"Examinees & Recordings"}>
          <TableContainer className='tableContainer'>
              <Table>
                <TableHead>
                  <TableRow >
                    {columns.map((col) => (
                      <TableCell  align='center' sx={tableTitleTextStyle}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={tableRowStyle}>
                      <TableCell component="th" scope="row" style={{fontFamily: 'Montserrat, sans-serif' }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="center" style={{fontFamily: 'Montserrat, sans-serif'}}>
                        {row.stat1}
                      </TableCell>
                      <TableCell align="center" style={{fontFamily: 'Montserrat, sans-serif'}}>
                        {row.stat2}
                      </TableCell>
                      <TableCell align="center" style={{fontFamily: 'Montserrat, sans-serif'}}>
                        {row.stat3}
                      </TableCell>
                      <TableCell align="center" style={{fontFamily: 'Montserrat, sans-serif'}}>
                        {row.stat4}
                      </TableCell>
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