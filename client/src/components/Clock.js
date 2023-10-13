import React, { useEffect, useState } from 'react';
import '../css/AdminDashboard.css';

export function formatISODate(date) {
  return `${(new Date(date).toDateString())}, ${(new Date(date).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}))}`
}

export function formatISOTime(date) {
  return (new Date(date).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}))
}

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