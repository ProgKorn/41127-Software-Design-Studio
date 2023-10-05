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
import { Grid } from '@mui/material';



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
    const navigate = useNavigate();
    
    // send a get api request to the server to retrieve and store the student details using axios
    useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (token) {
        const decodedToken = jwt_decode(token);
        const studenturl = "http://localhost:4000/student/get/" + decodedToken.userName;
  
        axios.get(studenturl)
          .then((response) => {
            const studentData = response.data; // Extract student data from the response
            const studentId = studentData.studentId; // Extract the studentId
            getStudent(studentData);
            setStudentId(studentId); // Store the studentId
            //setLoading(false);
  
            const examurl = "http://localhost:4000/class/get-exam/" + studentId;
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
    }, []); // End of useEffect
  

   //wait for all information to be retrieved before loading the student homepage
   if (loading)
   {
      return  <Loader loading={loading} />
   }
        const name = student.name;
   return (
    <div>
        <StudentHeader/>
        <header class = "student-header">
          <div className="student-heading">Student Homepage</div>
        </header>
        <Grid container spacing = {1}  className = 'pageCardPadding'>
          <Grid item xs={4}>
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 100 }} aria-label="customized table">
                      <TableHead>
                          <TableRow>
                              <StyledTableCell colSpan = {2}> Student Details</StyledTableCell>
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
            <Grid item xs={7} style = {{marginLeft: '100px'}}>
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                          <StyledTableCell colSpan={1} align = 'left'>Upcoming Exams</StyledTableCell>
                          <StyledTableCell colSpan={4}  align = 'right'>
                              <div className=".button-container-student">
                              <Link to="/previousexams" className="student-button" style= {{ width:'250px', display:'inline-flex', textAlign:'center', fontSize: '19px'}}>
                                  View Previous Exams
                              </Link>
                              </div>
                          </StyledTableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell style={{ fontWeight: 'bold',  fontFamily: 'Montserrat, sans-serif' }} align="left" >Exam Name</TableCell>
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
                          <StyledTableCell align="center">{row.startTime}</StyledTableCell>
                          <StyledTableCell align="center">{row.details}</StyledTableCell>
                          <StyledTableCell align="center">{row.seatNumber}</StyledTableCell>
                          <StyledTableCell align="center">
                              <Link to= {`/examstart/${student.studentId}/${row.examId}`} className="student-button" style={{ width:'115px', display:'inline-flex', textAlign:'center'}}>
                                  Access Exam
                              </Link>
                          </StyledTableCell>
                      </TableRow>
                      ))}
                  </TableBody>
                  </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={8} style = {{marginTop: '80px'}}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                          <StyledTableCell align = 'left'>Test Your Equipment </StyledTableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                  <TableRow>
                          <TableCell align="left" style = {{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', fontSize: "1em"}} >It is highly advised that you check your computer system you are using beforehand to ensure a smooth online testing experience.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align= 'left'>
                        <div className=".button-container-student">
                              <Link to="/testequipment" className="student-button" style= {{ width:'200px', display:'inline-flex', textAlign:'center', fontSize: '19px'}}>
                                  Run System Test
                              </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
        </Grid>
    </div>
  );
}

export default StudentHomepage;