import React from "react";
import '../css/UserManual.css';
import { Button } from '@mui/material';

const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    backgroundColor: "#ef233c",
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    '&.MuiButton-root:hover':{bgcolor: '#8d99ae'}
}

function Introduction( {onBackButtonClick} ) {
    return (
        <div>
            <header className='header'>
                <h2 className="text">Introduction</h2>
            </header>
            <div class="info-dump">
                <p>This User Manual (UM) provides the information necessary for students and examiners to effectively use the Sentinel web application which uses Artificial Intelligence (AI) software to prevent misconduct during exams. This application aims to enable examiners to detect misconduct easily and allow students to perform their respective exams while being monitored in the easiest way possible.</p>

                <p>The scope of this application was to deliver a web-based application to schools that could revitalize the way schools hold their online exams. Given this scope, the main requirements that the business analyst was able to derive from the perspective of both the students and the examiners includes the following:</p>

                <ul>
                    <li>To be able to verify the student’s identity upon login.</li>
                    <li>To flag any incidents of misconduct during an exam.</li>
                    <li>To be able to terminate a student’s exam when there are two flagged incidents.</li>
                    <li>To keep a log of incidents for each exam.</li>
                    <li>To keep full-length videos of students where misconduct was not detected.</li>
                </ul>

                <p>In the event of a system or software update (including bug fixes and the creation of additional features), newer versions of this user manual will be released to keep up with these changes.</p>

                <p>Because the student’s camera feed and all user information (including that of the examiner) is being stored, it is essential to have privacy protection software. All video information stored on the database will be encrypted and will require user authentication. Passwords stored on the system will be salted and password complexity will also be enforced. Data privacy and protection is at the core of the Sentinel AI Cheating Detection Software.</p>

                <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                    Back to User Manual
                </Button>
            </div>
        </div> 
    );
}
function Overview( {onBackButtonClick} ) {
    return ( 
        <div>
            <header className='header'>
                <h2 className="text">Overview</h2>
            </header>
            <p>Live Laugh Love</p>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to User Manual
            </Button>
        </div>
    );
}
function GettingStarted( {onBackButtonClick} ) {
    return ( 
        <div>
            <header className='header'>
                <h2 className="text">Getting Started</h2>
            </header>
            <p>Live Laugh Love</p>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to User Manual
            </Button>
        </div>
    );
}
function UsingTheSoftware( {onBackButtonClick} ) {
    return ( 
        <div>
            <header className='header'>
                <h2 className="text">Using The Software</h2>
            </header>
            <p>Live Laugh Love</p>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to User Manual
            </Button>
        </div>
    );
}
function Troubleshooting( {onBackButtonClick} ) {
    return ( 
        <div>
            <header className='header'>
                <h2 className="text">Troubleshooting And Support</h2>
            </header>
            <p>Live Laugh Love</p>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to User Manual
            </Button>
        </div>
    );
}

export {Introduction, Overview, GettingStarted, UsingTheSoftware, Troubleshooting};