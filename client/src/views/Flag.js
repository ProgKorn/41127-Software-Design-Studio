import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { Grid } from '@mui/material';
import Card from '../components/Card';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import '../css/AdminPages.css';
import jwt_decode from 'jwt-decode';

function Flag() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

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
  }, [isAdmin, navigate]);

  return (
    <div className="Flag">
      <AdminHeader/>
      <h1>Flag Details</h1>
      <Grid container spacing={2} columns={16} >
        <Grid item xs={8}>
          <Card title={"Examinee"} half>
            <div style={{ display: 'flex'}}>
              <div style={{ width: '70%'}}>
                <div className='listRowContainer' style={{ width: '100%' }}>
                  <div className='listTitleText' style={{ width: 150 }}>
                    Type
                  </div>
                  <div className='listDescriptionText'>
                    Description 1
                  </div>
                </div>
              </div>
              {/* Placeholder for user photo */}
              <div style={{ height: 250,
                width: '30%',
                backgroundColor: 'aliceblue',
                margin: 20,
                borderRadius: 10}}>  
              </div>
            </div>
          </Card>
          <Card title={"Exam Details"} half>
            <div className='listRowContainer'>
              <div className='listTitleText' style={{ width: 150 }}>
                Type
              </div>
              <div className='listDescriptionText'>
                Description
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={8}>
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
                    Flag details here
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

export default Flag;
