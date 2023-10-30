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

//TODO: Add the Flagged Clip
function Flag() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [flag, setFlag] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {flagId} = useParams();
  const [exam, setExam] = useState([]);
  const [student, setStudent] = useState([]);

const fetchFlag = async () => {
   axios.get(process.env.REACT_APP_SERVER_URL +'/flag/getFlagDetails/' + flagId)
  .then((response) => {
    setFlag(response.data)
    return axios.all([
    axios.get(process.env.REACT_APP_SERVER_URL +'/exam/getExamDetails/' + response.data.examId),
    axios.get(process.env.REACT_APP_SERVER_URL +'/student/getStudentDetails/' + response.data.studentId)
    ]);
  })
  .then(axios.spread((examResponse, studentResponse) => {
    setExam(examResponse.data)
    setStudent(studentResponse.data)
    setLoading(false)
  }));
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
  fetchFlag();
}, [isAdmin, navigate]);

return loading ? <Loader loading={(loading)} /> 
:(<div className="Flag">
  <AdminHeader/>
    <h1 style={{ padding: 0 }}>Flag Details</h1>
    <Grid container spacing={2} columns={16} className='pageCardPadding'>
      <Grid item xs={8} style={{ height: '80vh' }}>
        <Card title={"Examinee"} half>
        <CardTable 
          columns={["Student ID", "Name", "Email"]}
          rows={[student.studentId, `${student.name.firstName} ${student.name.lastName}`, student.email]}
        />
        {/*commented out the creepy face image url */}
        {/*   <div style={{ display: 'flex'}}>
          <div style={{ width: '70%'}}>
            <CardTable 
              columns={["Student ID", "Name", "Email"]}
              rows={[student.studentId, `${student.name.firstName} ${student.name.lastName}`, student.email]}
              headerWidth={150}
            />
          </div>
          <img style={{ height: 250,
            width: '30%',
            margin: 20,
            borderRadius: 10}}src={student.faceImageUrl} alt="student profile">
          </img>
        </div>  */}
        </Card>
        <Card title={"Exam Details"} half>
          <div style={{ height: '30vh', width: '100%', overflow: 'auto'}}><CardTable 
            columns={["Exam ID", "Name", "Details", "Start Time", "End Time"]}
            rows={[exam.examId, exam.examName, exam.details, formatISODate(exam.startTime), formatISODate(exam.endTime)]}
            />
          </div>
        </Card>
      </Grid>
      <Grid item xs={8} style={{ height: '80vh' }}>
        <Card title={"Flag Report"}>
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
                  <div style={{ paddingBottom: 20 }}>{flag.sessionName}</div>
                  <div>The current status is '{flag.status}'.</div>
                </div>
              </div>
            </div>
          </div>
          <div className='flagVideoSection' >
            <div className='flagVideoTitle'>
              Flagged Clip
            </div>
            {/* Placeholder for flagged */}
            <div style={{ height: '30vh', 
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

export default Flag;
