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
import CardTable from './CardTable';
import { formatISODate } from '../components/Clock';

function Exam() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [exam, setExam] = useState(null);
  const [examStudents, getExamStudents] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const navigate = useNavigate();
  const {examId} = useParams();

  const fetchExam = async () => {
    try {
      const response = await axios.get('http://localhost:4000/exam/getExamDetails/' + examId);
      setExam(response.data);
      setLoading1(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExamStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/student/getExamStudents/' + examId);
      getExamStudents(response.data);
      setLoading2(false);
    } catch (error) {
      console.error(error);
    }
  };

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
    fetchExam();
    fetchExamStudents();
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

  // Wait for all information to be retrieved before loading the student homepage
  return (loading2 || loading1) ? <Loader loading={true} /> : (
    <div className="Exam">
      <AdminHeader/>
      <h1>Exam Details</h1>
      <Grid container spacing={2} columns={16} className='pageCardPadding'>
        <Grid item xs={8}>
          <Card title={"Examination Details"}>
            {exam && <CardTable 
              columns={["Exam ID", "Name", "Details", "Start Time", "End Time"]}
              rows={[exam.examId, exam.examName, exam.details, formatISODate(exam.startTime), formatISODate(exam.endTime)]}
            />}
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
                  {examStudents && examStudents.map((row) => (
                  <TableRow 
                    key={row.examId}
                    sx={tableRowStyle}
                  >
                    <TableCell component="th" scope="row" style={{fontFamily: 'Montserrat, sans-serif'}} align="center">
                      <a href={`/student/${row.studentId}`} style={{ color: 'blue' }}>
                        {row.name}
                      </a>
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