import React from 'react';
import AdminHeader from '../components/AdminHeader';
import { Grid } from '@mui/material';
import Card from '../components/Card';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import '../css/AdminPages.css';

function Flag() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3)
  ];

  const columns = [
    'Examinee', 'Student Id', 'Flags', 'Duration', 'Status'
  ]

  return (
    <div className="Flag">
      <AdminHeader/>
      <h1>Flag Details</h1>
      <Grid container spacing={2} columns={16} >
        <Grid item xs={8}>
          <Card title={"Examinee"} half>
            <div style={{ display: 'flex'}}>
              <div style={{ width: '70%'}}>
                <div style={{width: '100%', display:'flex', fontFamily: 'Montserrat, sans-serif',  borderBottom: 'solid 1px rgb(223, 223, 223)',
                  alignContent: 'space-between'}}>
                  <div style={{width: 150, fontWeight: 'bold', padding: 20, paddingLeft: 60, textAlign: 'left', 
                  backgroundColor: 'rgb(245, 247, 253)', color: 'rgb(85, 89, 130)'}}>
                    Type</div>
                  <div style={{ padding: 20, textAlign: 'left' }}>Description 1</div>
                </div>
              </div>
              <div style={{ height: 250, width: '30%', backgroundColor: 'aliceblue', margin: 20, borderRadius: 10}}></div>
            </div>
          </Card>
          <Card title={"Exam Details"} half>
            <div style={{width: '100%', display:'flex', fontFamily: 'Montserrat, sans-serif',  borderBottom: 'solid 1px rgb(223, 223, 223)',
            alignContent: 'space-between'}}>
              <div style={{width: 150, fontWeight: 'bold', padding: 20, paddingLeft: 60, textAlign: 'left', 
                backgroundColor: 'rgb(245, 247, 253)', color: 'rgb(85, 89, 130)'}}>
                Type</div>
              <div style={{ padding: 20, textAlign: 'left' }}>Description</div></div>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card title={"Flag Report"}>
            <div style={{ height: 130, padding: 20 }}>
              <div style={{ display: 'flex',  margin: 'auto', width: '90%', border: 'solid 1px rgb(223, 223, 223)',
                margin: 'auto', padding: 0, borderRadius: 20, height: 130}}>
                <div style={{ width: '20%', borderRight: 'solid 1px rgb(223, 223, 223)' }}>
                  <div style={{ padding: 20}}>
                    <FlagRoundedIcon style={{ color: '#CC3746', height: 50, width: 50 }} />
                      <div style={{ color: '#CC3746', padding: 5, fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold', fontSize: '1.2rem'}}>
                        Flag</div>
                    </div>
                </div>
                <div style={{ width: '80%' }}>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', padding:25, textAlign: 'left' }}> Flag details here</div>
                </div>
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold', textAlign: 'left', width: '90%', margin: 'auto', padding: 10 }}> Flagged Clip</div>
              <div style={{ height: 400, width: '90%', margin: 'auto', backgroundColor: 'aliceblue', 
              borderRadius: 10, marginTop: 40 }}></div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Flag;
