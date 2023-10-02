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
import { capitalize } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2b2d42',
    color: 'white',
    fontSize: '1.85em',
    marginTop: '0.83em',
    marginBottom: '0.83em',
    marginLeft: 0,
    marginRight: 0,
    fontWeight: 'bold',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: "capitalize",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: 'Montserrat, sans-serif'
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
        <div className="main">
            <h1>Student Homepage</h1>
        </div>
        <div class = 'parent' style = {{display: 'flex'}}>
            <div class = 'child'>
                <div style={{ width: '120%'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 100 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Student Details</StyledTableCell>
                                    <StyledTableCell  align = 'right'>
                                <div className=".button-container-student">
                                <Link to="/editdetails" className="student-button" style= {{ width:'200px', display:'inline-flex', textAlign:'center'}}>
                                    Edit Details
                                </Link>
                                </div>
                            </StyledTableCell>
                                </TableRow> 
                            </TableHead>
                            <TableBody>
                            <TableRow >
                            <StyledTableCell>First Name: </StyledTableCell>  
                            <StyledTableCell>{name.firstName}</StyledTableCell>
                            </TableRow >
                            <TableRow >
                            <StyledTableCell>Last Name: </StyledTableCell>  
                            <StyledTableCell>{name.lastName}</StyledTableCell>
                            </TableRow>
                            <TableRow >
                            <StyledTableCell>Student ID: </StyledTableCell>  
                            <StyledTableCell>{student.studentId}</StyledTableCell>
                            </TableRow>
                            <TableRow >
                            <StyledTableCell>Email: </StyledTableCell>  
                            <StyledTableCell>{student.email}</StyledTableCell>
                            </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>  
                </div>
            </div>
            <div class = 'child' style = {{marginLeft: '10%'}} >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell colSpan={1} align = 'left'>Upcoming Exams</StyledTableCell>
                            <StyledTableCell colSpan={4}  align = 'right'>
                                <div className=".button-container-student">
                                <Link to="/previousexams" className="student-button" style= {{ width:'250px', display:'inline-flex', textAlign:'center'}}>
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
            </div>
        </div>
        <TableContainer component={Paper} style = {{width: '80%', marginLeft: '2%' , marginTop: '50px'}}>
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
                        <Link to="/previousexams" className="student-button" style= {{ width:'200px', display:'inline-flex', textAlign:'center'}}>
                            Run System Test
                        </Link>
                    </div>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}

export default StudentHomepage;