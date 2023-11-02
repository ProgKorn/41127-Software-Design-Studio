import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { Grid } from '@mui/material';
import Card from '../components/Card';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import '../css/AdminPages.css';
import jwt_decode from 'jwt-decode';
import Loader from '../components/Loader';
import axios from 'axios';
import CardTable from './CardTable';
import { formatISODate } from '../components/Clock';
import StatusChip from '../components/StatusChip';

function ExamSection(props) {
  const [studentExams, setStudentExams] = useState(null);

  const fetchStudentExams = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL +'/student/getStudentExams/' + props.studentId);
      setStudentExams(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudentExams();
  }, []);

  return studentExams ? <CardTable 
    columns={studentExams.slice(0, 3).map((exam) => `${exam.examName}`)}
    rows={studentExams.slice(0, 3).map((exam) => `Seat: ${exam.seatNo}. Status: ${exam.status}. ${formatISODate(exam.startTime)}.`)}
  /> : <></>
}

function StudentSection(props) {
  const student = props.student;

  return student ? <div style={{ display: 'flex', overflow: 'auto'}}>
    <div style={{ width: '70%'}}>
      <CardTable 
        columns={["Student ID", "Name", "Email"]}
        rows={[student.studentId, `${student.name.firstName} ${student.name.lastName}`, student.email]}
      />
    </div>
    {student.faceImageUrl && 
    <img style={{ width: '30%', margin: 20, borderRadius: 10}} 
      src={student.faceImageUrl} 
      alt="student profile">
    </img>}
  </div> : <></>
}

function FlagSection(props) {
  const [studentFlags, setStudentFlags] = useState(null);

  const fetchStudentFlags = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL +'/flag/getStudentFlagDetails/' + props.studentId);
      setStudentFlags(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudentFlags();
  }, []);

  // Gets the latest five flags. TODO: add overflow scrolling
  return studentFlags ? studentFlags.map(flag => (
    <div style={{ display: 'flex' }}>
      <div><StatusChip status={flag.status} /></div>
      <div style={{paddingLeft: '4px'}}>{`Exam ${flag.examId}, ${flag.description}, ${flag.sessionName}`}</div>
    </div>
  )) : <>No flags</>
}

function Student() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [student, setStudent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {studentId} = useParams();

  const fetchStudent = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL +'/student/getStudentDetails/' + studentId);
      setStudent(response.data);
      setLoading(false);
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
    fetchStudent();
  }, [isAdmin, navigate]);

  return loading ? <Loader loading={(loading)} /> 
    :(<div className="Flag">
      <AdminHeader/>
      <h1>Student Details</h1>
      <Grid container spacing={2} columns={16} className='pageCardPadding'>
        <Grid item xs={8}>
          <Card title={"Examinee"} half>
            {student && <StudentSection student={student}/>}
          </Card>
          <Card title={"Exams"} half>
           {student && <ExamSection studentId={student.studentId}/>}
          </Card>
        </Grid>
        <Grid item xs={8} style={{ height: '80vh' }}>
        <Card title={"Flag History"}  style={{ height: '80vh' }}>
            <div className='flagDetailSection'>
              <div className='flagDetailContainer'>
                <div className='flagDetailTitle'>
                  <div className='flagDetailTitleSection'>
                    <FlagRoundedIcon style={{ color: '#CC3746', height: 50, width: 50 }} />
                      <div className='flagDetailTitleText'>
                        Flag
                      </div>
                    </div>
                </div>
                <div style={{ width: '80%', height: '100%', overflow: 'auto' }}>
                  <div className='flagDetailDescriptionText' style={{height: '100%'}}>
                    <FlagSection studentId={student.studentId}/>                    
                  </div>
                </div>
              </div>
            </div>
            <div className='flagVideoSection'>
              <div className='flagStudentVideoTitle'>
                Most Recent Flagged Clip
              </div>
              {/* Placeholder for flagged */}
              <div style={{
                  width: '90%', 
                  height: '32vh',
                  display: 'flex',
                  margin: 'auto', 
                  alignContent: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'aliceblue', 
                  borderRadius: 10, 
                  overflow: 'auto',
                  marginTop: 20 }}> 
                  <video 
                    src={"https://res.cloudinary.com/dljsodofn/video/upload/v1698925953/blob_hwo8th.mkv"}
                    autoplay
                    muted
                    controls>
                  </video>
                {/* {recentFlag ? <></> : <div style={{ paddingTop: '11vh', fontFamily: 'Montserrat, sans-serif' }}>No Flags</div>} */}
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Student;
