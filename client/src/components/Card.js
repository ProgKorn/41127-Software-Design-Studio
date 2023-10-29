import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

function Card(props) {

  return (
    <div style={{ backgroundColor: 'white', borderRadius: 10, height: props.half ? '49%' : '100%', margin: 10, boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}>
      <div style={{height: 60, backgroundColor: '#2b2d42', textAlign: 'left', borderRadius: '10px 10px 0px 0px'}}>
        {props.button && <Button component={Link} to={props.button.route} 
        style={{float: 'right', margin: 10 }}
        color='success' variant='contained'
        >
          {props.button.text}
        </Button>}
        <div style={{fontFamily: 'Montserrat, sans-serif', color: 'white', fontSize: "1.3rem",
          display: 'inline-block', padding: 18, paddingLeft: 60 }}>
          {props.title}
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default Card;