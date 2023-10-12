import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import Loader from '../components/Loader';
import axios from 'axios';

function Exam() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [exam, getExam] = useState('');
  const [examStudent, getExamStudent] = useState('');
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const navigate = useNavigate();
  const {examId} = useParams();

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
    const examUrl = 'http://localhost:4000/exam/getExamDetails/' + examId
    axios.get(examUrl)
    .then((response) => {
      getExam(response.data);
      setLoading1(false);
    });
    const examStudentUrl = 'http://localhost:4000/student/getExamStudents/' + examId
    axios.get(examStudentUrl)
    .then((response) => {
      getExamStudent(response.data);
      setLoading2(false);
    });
  }, [isAdmin, navigate]);

  const columns = [
    'Examinee', 'Student Id', 'Flags', 'Seat Number', 'Status'
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
  //wait for all information to be retrieved before loading the student homepage
  if (loading2 || loading1)
    {
      return  <Loader loading={(loading2 || loading1)} />
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
                Exam ID:
              </div>
              <div className='listDescriptionText' style={{ width: '70%' }}>
                {exam.examId}
              </div>
            </div>
            <div className='listRowContainer'>
              <div className='listTitleText' style={{ width: '30%' }}>
                Exam Name:
              </div>
              <div className='listDescriptionText' style={{ width: '70%' }}>
                {exam.examName}
              </div>
            </div>
            <div className='listRowContainer'>
              <div className='listTitleText' style={{ width: '30%' }}>
                Details:
              </div>
              <div className='listDescriptionText' style={{ width: '70%' }}>
                {exam.details}
              </div>
            </div> 
            <div className='listRowContainer'>
              <div className='listTitleText' style={{ width: '30%' }}>
                Start Time:
              </div>
              <div className='listDescriptionText' style={{ width: '70%' }}>
                {exam.startTime}
              </div>
            </div>
            <div className='listRowContainer'>
              <div className='listTitleText' style={{ width: '30%' }}>
                End Time:
              </div>
              <div className='listDescriptionText' style={{ width: '70%' }}>
                {exam.endTime}
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
                      <TableCell  sx={tableTitleTextStyle} align='center' style={{fontFamily: 'Montserrat, sans-serif'}}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                      {examStudent.map((row) => (
                      <TableRow 
                          key={row.examId}
                          sx={tableRowStyle}
                      >
                          <TableCell component="th" scope="row" style={{fontFamily: 'Montserrat, sans-serif'}}>
                          {row.name}
                          </TableCell>
                          <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="center">{row.studentId}</TableCell>
                          <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="center">{row.flags}</TableCell>
                          <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="center">{row.seatNumber}</TableCell>
                          <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="center">{row.status}</TableCell>
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