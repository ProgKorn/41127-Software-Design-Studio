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
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

function Exam() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [exam, setExam] = useState(null);
  const [examStudents, getExamStudents] = useState(null);
  const [studentVideo, setStudentVideo] = useState(false);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const navigate = useNavigate();
  const {examId} = useParams();

  const fetchExam = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL +'/exam/getExamDetails/' + examId);
      setExam(response.data);
      setLoading1(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExamStudents = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL +'/student/getExamStudents/' + examId);
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
        setIsAdmin(false);
        navigate('/noaccess'); 
	    }
	  }
    fetchExam();
    fetchExamStudents();
  }, [isAdmin, navigate]);

  const columns = [
    'Examinee', 'Student Id', 'Flags', 'Seat Number', 'Status', ''
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
      <h1 style={{ padding: 0 }}>Exam Details</h1>
      <Grid container spacing={2} columns={16} className='pageCardPadding' maxWidth={'100%'} maxHeight={'100%'} style={{ paddingTop: 0 }}>
        <Grid sx={{maxHeight: '80vh'}} item xs={8}>
          <Card title={"Examination Details"}>
            {exam && <div style={{ overflow: 'auto' }}><CardTable 
              columns={["Exam ID", "Name", "Details", "Start Time", "End Time"]}
              rows={[exam.examId, exam.examName, exam.details, formatISODate(exam.startTime), formatISODate(exam.endTime)]}
            /></div>}
          </Card>
        </Grid>
        <Grid sx={{maxHeight: '80vh'}}  item xs={8}>
          <Card title={"Examinees & Recordings"}>
            <div style={{ width: '100%', height: '100%', overflow: 'auto'}}>
            <TableContainer className='tableContainer' style={{overflow: 'auto', maxWidth: '100%'}} >
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell  sx={tableTitleTextStyle} align='center' style={{fontFamily: 'Montserrat, sans-serif'}}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {examStudents && examStudents.map((examStudent) => (
                  <TableRow 
                    key={examStudent.examId}
                    sx={tableRowStyle}
                  >
                    <TableCell component="th" scope="row" style={{fontFamily: 'Montserrat, sans-serif'}} align="center">
                      <a href={`/student/${examStudent.studentId}`} style={{ color: 'blue' }}>
                        {examStudent.name}
                      </a>
                    </TableCell>
                    <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="center">{examStudent.studentId}</TableCell>
                    <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="center">{examStudent.flags}</TableCell>
                    <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="center">{examStudent.seatNo}</TableCell>
                    <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="center">{examStudent.status}</TableCell>
                    <TableCell align="center">
                      <div onClick={() => setStudentVideo(examStudent)} style={{ color: 'blue', '&:hover': { cursor: 'pointer' }}}>
                          <PlayCircleOutlineIcon />
                      </div> 
                    </TableCell>
                    {studentVideo ? <div className="admin-video-popup">
                      <div className="popup-content">
                        <div className="notification-video">
                          <p>{studentVideo.name} ({studentVideo.studentId}) in Exam ID: {studentVideo.examId} </p>
                          <video src={studentVideo.fullRecording} autoplay muted controls></video>
                        </div>
                        <button onClick={() => setStudentVideo(null)} className="ok-button">OK</button>
                      </div>
                    </div> : <></>}
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
              </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Exam;