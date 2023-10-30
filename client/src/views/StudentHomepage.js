import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
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
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Loader from '../components/Loader'
import { Button, Grid } from '@mui/material';



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

function StudentHomepage() {
    const [student, getStudent] = useState(''); // retrieve data returned by the api response
    const [studentId, setStudentId] = useState(' ');
    const [loading, setLoading] = useState(true); // loading state that prevents access to undefined data, while waiting to get a response from api call
    const [exam, getExam] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true);
    const navigate = useNavigate();

    const buttonStyles = {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "1rem",
      fontWeight: 500,
      textTransform: 'Capitalize',
      color: 'white',
      backgroundColor: "#292E64",
      boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
    }

    const rows = [
      createData('SDS 31274 Finals', '21/08/2023 3:00:00', 'Language: English', '13', '21/08/2023 5:00:00'),
      createData('SDS 31274 Finals', '21/08/2023 3:00:00', 'Language: English', '13', '21/08/2023 5:00:00'),
    ]

    function createData (examName,  examStart, details, seatNo, finishTime) {
      return{examName, examStart, details, seatNo, finishTime};
    }
    
    // send a get api request to the server to retrieve and store the student details using axios
    useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (token) {
        const decodedToken = jwt_decode(token);
        const studenturl = process.env.REACT_APP_SERVER_URL + "/student/get/" + decodedToken.userName;
        
        if (decodedToken && decodedToken.isAdmin === true) {
          setIsAdmin(true);
          navigate('/noaccess');
        } else {
          setIsAdmin(false);
        }
  
        axios.get(studenturl)
          .then((response) => {
            const studentData = response.data; // Extract student data from the response
            const studentId = studentData.studentId; // Extract the studentId
            getStudent(studentData);
            setStudentId(studentId); // Store the studentId
            //setLoading(false);
  
            const examurl = process.env.REACT_APP_SERVER_URL + "/class/get-exam/" + studentId;
            axios.get(examurl)
              .then((examResponse) => {
                getExam(examResponse.data);
                setLoading(false);
              })
              .catch(examError => {
                console.error(examError);
                setLoading(false);
              });
          })
          .catch(studentError => {
            console.error(studentError);
            setLoading(false);
          });
      } else {
        navigate("/login");
        setLoading(false);
      }
    }, [navigate]); // End of useEffect
  

   //wait for all information to be retrieved before loading the student homepage
   if (loading)
   {
      return  <Loader loading={loading} />
   }
        const name = student.name;
   return (
    <div>
        <StudentHeader/>
        <h1>Student Homepage</h1>
        <Grid container spacing = {1}  className = 'pageCardPadding'>
          <Grid className='grid'>
          <Grid item xs={4} marginTop={4}>
              <TableContainer component={Paper} elevation={8} className="table-container">
                  <Table sx={{ minWidth: 100 }} aria-label="customized table" className='table'>
                      <TableHead>
                          <TableRow>
                              <StyledTableCell colSpan = {2} style={{ height: '40px' }}>Student Details</StyledTableCell>
                          </TableRow> 
                      </TableHead>
                      <TableBody >
                      <TableRow >
                      <StyledTableCell style = {{ fontWeight:'bold', fontSize: '16.5px'}}  >First Name:  </StyledTableCell>  
                      <StyledTableCell style = {{fontSize: '16px'}}>  {name.firstName} </StyledTableCell>
                      </TableRow >
                      <TableRow >
                      <StyledTableCell style = {{ fontWeight:'bold', fontSize: '16.5px'}}> Last Name: </StyledTableCell> 
                      <StyledTableCell style = {{fontSize: '16px'}}>{name.lastName}</StyledTableCell>
                      </TableRow>
                      <TableRow >
                      <StyledTableCell style = {{ fontWeight:'bold', fontSize: '16.5px'}}>Student ID: </StyledTableCell>  
                      <StyledTableCell style = {{fontSize: '16px'}}>{student.studentId}</StyledTableCell>
                      </TableRow>
                      <TableRow >
                      <StyledTableCell style = {{ fontWeight:'bold', fontSize: '16.5px'}}>Email: </StyledTableCell>  
                      <StyledTableCell style = {{fontSize: '16px'}}>{student.email}</StyledTableCell>
                      </TableRow>
                      </TableBody>
                  </Table>
              </TableContainer>  
            </Grid>
            <Grid item xs={8} marginLeft={5} marginTop={4}>
              <TableContainer component={Paper} elevation={8} className="table-container">
                  <Table sx={{ minWidth: 650 }} aria-label="customized table" className='table'>
                  <TableHead>
                      <TableRow>
                          <StyledTableCell colSpan={4} align = 'left' style={{ height: '40px' }}>Upcoming Exams</StyledTableCell>
                          <StyledTableCell colSpan={4}  align = 'right'>
                              <div className=".button-container-student">
                              </div>
                          </StyledTableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }} align="left" >Exam Name</TableCell>
                          <TableCell style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }} align="center">Exam Start</TableCell>
                          <TableCell style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }} align="center">Details</TableCell>
                          <TableCell style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }} align="center">Seat No.</TableCell>
                          <TableCell style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }} align="center">Access Exam</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {exam.map((row) => (
                      <TableRow 
                          key={row.examId}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                          <StyledTableCell component="th" scope="row">
                          {row.examName}
                          </StyledTableCell>
                          <StyledTableCell align="center">{new Date(row.startTime).toLocaleString()}</StyledTableCell>
                          <StyledTableCell align="center">{row.details}</StyledTableCell>
                          <StyledTableCell align="center">{row.seatNo}</StyledTableCell>
                          <StyledTableCell align="center">
                              <Button component={Link} variant='contained' to={`/examstart/${student.studentId}/${row.examId}`} className='student-button' sx={buttonStyles}>
                                Access Exam
                              </Button>
                          </StyledTableCell>
                      </TableRow>
                      ))}
                  </TableBody>
                  </Table>
              </TableContainer>
              </Grid>
            </Grid>
            <Grid xs={12} marginRight={4} marginTop={6}>
            <TableContainer component={Paper} elevation={8}>
                    <Table sx={{minWidth: 200}} aria-label="customised table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell colSpan={5}>Previous Exams</StyledTableCell>
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
                                <StyledTableCell component="th" scope="row">
                                {row.examName}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.examStart}</StyledTableCell>
                                <StyledTableCell align="center">{row.details}</StyledTableCell>
                                <StyledTableCell align="center">{row.seatNo}</StyledTableCell>
                                <StyledTableCell align="center">{row.finishTime}</StyledTableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </div>
  );
}

export default StudentHomepage;