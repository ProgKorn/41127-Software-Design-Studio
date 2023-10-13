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

function ExamSection(props) {
  const [studentExams, setStudentExams] = useState(null);

  const fetchStudentExams = async () => {
    try {
      const response = await axios.get('http://localhost:4000/student/getStudentExams/' + props.studentId);
      setStudentExams(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudentExams();
  }, []);

  return studentExams ? <CardTable 
    columns={studentExams.map((exam) => `${exam.examName}`)}
    rows={studentExams.map((exam) => `Seat: ${exam.seatNumber}. Status: ${exam.status}. ${formatISODate(exam.startTime)}.`)}
  /> : <></>
}

function StudentSection(props) {
  const student = props.student;

  return student ? <div style={{ display: 'flex'}}>
    <div style={{ width: '70%'}}>
      <CardTable 
        columns={["Student ID", "Name", "Email"]}
        rows={[student.studentId, `${student.name.firstName} ${student.name.lastName}`, student.email]}
      />
    </div>
    {student.faceImageUrl && <img style={{ height: 250,
      width: '30%',
      margin: 20,
      borderRadius: 10}} src={student.faceImageUrl} alt="student profile">
    </img>}
  </div> : <></>
}

function FlagSection(props) {
  const [studentFlags, setStudentFlags] = useState(null);

  const fetchStudentFlags = async () => {
    try {
      const response = await axios.get('http://localhost:4000/flag/getStudentFlagDetails/' + props.studentId);
      setStudentFlags(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudentFlags();
  }, []);

  // Gets the latest five flags. TODO: add overflow scrolling
  return studentFlags ? studentFlags.slice(0, 5).map(flag => (<div>{`Exam #${flag.examId} ${flag.sessionName}: ${flag.description}`}</div>)) : <></>
}

function Student() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [student, setStudent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {studentId} = useParams();

  const fetchStudent = async () => {
    try {
      const response = await axios.get('http://localhost:4000/student/getStudentDetails/' + studentId);
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
        <Grid item xs={8}>
          <Card title={"Flag History"}>
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
                <div style={{ width: '80%' }}>
                  <div className='flagDetailDescriptionText'>
                    <FlagSection studentId={student.studentId}/>
                    {/* <div style={{ paddingBottom: 20 }}>{flag.sessionName}</div>
                    <div>The current status is '{flag.status}'.</div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='flagVideoSection'>
              <div className='flagVideoTitle'>
                Flagged Clip
              </div>
              {/* Placeholder for flagged */}
              <div style={{ height: 400, 
                  width: '90%', 
                  margin: 'auto', 
                  backgroundColor: 'aliceblue', 
                  borderRadius: 10, 
                  marginTop: 30 }}>  
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Student;
