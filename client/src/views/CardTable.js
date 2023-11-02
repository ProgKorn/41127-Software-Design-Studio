import React from 'react';
import '../css/AdminPages.css';

function CardTable(props) {
  
  return props.columns.map((header, i) => 
    <div className='listRowContainer'>
      <div className='listTitleText' style={{ minWidth: props.headerWidth ?? 130, height: '100%' }}>
          {header}
      </div>
      <div className='listDescriptionText'>
          {props.rows[i]}
      </div>
    </div>)
}

export default CardTable;
