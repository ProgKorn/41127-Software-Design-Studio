import React, { useEffect, useState } from 'react';
import '../css/AdminDashboard.css';

function Clock() {
	const [dateState, setDateState] = useState(new Date());

	useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, [])

  return (
    <div className='clockContainer'>
      <p className='clockDateText'>
        {
          dateState.toDateString()
        }
      </p>
      <p className='clockTimeText'>
        {dateState.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </p>
    </div>
  );
}

export default Clock;