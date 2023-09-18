import React, {useState, useEffect} from 'react';
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

function createData2(examName, examStart, details, seatNo, accessExam) {
  return {examName, examStart, details, seatNo, accessExam };
}

const rows2 = [
  createData2('SDS 31274 Finals', '21/08/2023 3:00:00', 'Language: English', '13', 'ACCESS'),
  createData2('SDS 31274 Finals', '21/08/2023 3:00:00', 'Language: English', '13', 'ACCESS'),
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#8D99AE',
      color: 'black',
      fontSize: '1.50em',
      marginTop: '0.83em',
      marginBottom: '0.83em',
      marginLeft: 0,
      marginRight: 0,
      fontWeight: 'bold',
    },
  }));

function StudentHomepage() 
{

   const [student, getStudent] = useState(''); // retrieve data returned by the api response
   const [loading, setLoading] = useState(true); //loading state that prevents access to undefined data, while waiting to get a response from api call
//    const [isAdmin, setIsAdmin] = useState(false);
//    const navigate = useNavigate();

   //send a get  api request to the server to retrieve and store the student details using axios 
   useEffect(() => {
    // Student View does not load locally so do not want to push untested code. Please test then uncomment.
    // const token = localStorage.getItem('token');
    // if (token) {
	//   const decodedToken = jwt_decode(token);
	//   console.log(decodedToken);
    //   if (decodedToken.isAdmin === true) {
    //     setIsAdmin(true);
    //   } else {
	// 	navigate('/noaccess');
	//   }
	// }
    axios.get('http://localhost:4000/student/get').then((response) => {
        getStudent(response.data);
        setLoading(false);
    })
    .catch(error => console.error(error)); 
   }, []);
   //}, [isAdmin, navigate]);

   //wait for all information to be retrieved before loading the student homepage
   if (loading)
   {
      return <div> Retrieving Data </div>
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
                            <StyledTableCell>Seat Number: </StyledTableCell>  
                            <StyledTableCell>{student.seatNumber}</StyledTableCell>
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
                            <StyledTableCell colSpan={2} align = 'left'>Upcoming Exams</StyledTableCell>
                            <StyledTableCell colSpan={3}  align = 'right'>
                                <div className=".button-container-student">
                                <Link to="/previousexams" className="student-button" style= {{ width:'200px', display:'inline-flex', textAlign:'center'}}>
                                    View Previous Exams
                                </Link>
                                </div>
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Exam Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Exam Start</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Details</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Seat No.</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Access Exam</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows2.map((row) => (
                        <TableRow 
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {row.examName}
                            </TableCell>
                            <TableCell align="center">{row.examStart}</TableCell>
                            <TableCell align="center">{row.details}</TableCell>
                            <TableCell align="center">{row.seatNo}</TableCell>
                            <TableCell align="center">
                                <Link to="/examStart" className="student-button" style={{ width:'115px', display:'inline-flex', textAlign:'center'}}>
                                    Access Exam
                                </Link>
                            </TableCell>
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
                <TableRow>
                    <TableCell align="left">It is highly advised that you check your computer system you are using beforehand to ensure a smooth online testing experience.</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
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
