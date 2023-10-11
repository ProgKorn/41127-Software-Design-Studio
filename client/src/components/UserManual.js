import React from "react";
import '../css/UserManual.css';
import { Button } from '@mui/material';
import UM1 from '../UM1.png';
import LightBulbIcon from '../UMLightBulb.png';
import WarningIcon from '../UMWarning.jpg';
import InfoIcon from '../UMInfo.jpg';

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
            <div className="info-dump">
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
            <div className="info-dump">
                <p>The Sentinel Web-Based Application is an AI Anti-Cheating Detection Software that was created to facilitate online exams and detect cheating incidents with ease. Our system integrates features that are separately accessible to both the students and the examiners. For the examiner side, this system will allow them to easily detect misconduct incidents and allow them to easily terminate an exam. They are also able to go back and review cheating incidents which will be stored on the database. This will reduce the need for constant monitoring on the examiners end and will ensure that students also have a fair assessment of their learning.</p>

                <p>Since the beginning of COVID-19, most if not all educational institutions have turned to online modes of learning. With the shift to online learning, students can more easily access information at their disposal than ever before. However, this means that they also have an opportunity to misuse data including using the internet and other resources to cheat during exams (Newton, 2023). Our aim in developing this product was to reduce cheating incidents and to ensure fairness and equality when taking online exams. In order to reduce wrongful termination during a student’s exam, the examiner has the ability to accept or decline the termination if two warnings are given. An extra exam log post exam will show the flagged incidents and allow the examiner to access the clip of the cheating incident.</p>

                <p>To use the system, the users will be authenticated based on the student/staff email address and password provided by the university.</p>

                <h3 className="text">Conventions</h3>

                <img src={UM1} className="image"></img>

                <h5 className="sub-heading">Figure 1: Introduction to Sentinel</h5>

                <div className="image-text-container">
                    <img src={LightBulbIcon} className="icon-image"></img><p>Figure 1 provides a high-level view of the student flagging process and how each component of our anti cheating system interacts with one another. Data is stored in the MongoDB Database which is hosted separately from the Sentinel System. The user uses the browser through the React Front-end design to interact with different pages of the system. </p>
                </div>

                <p>The main functions of our system include but are not limited to:</p>

                <ul>
                    <li>Login - There are two different logins for the student and examiner user. Each login will bring the user to different home screens with different access rights.</li>
                    <li>Student Functionality</li>
                    <ul>
                        <li>View past Examinations</li>
                        <li>View scheduled proctored examinations</li>
                        <li>Start a proctored examination session</li>
                        <li>Test their equipment before the exam</li>
                    </ul>
                    <li>Examiner Functionality</li>
                    <ul>
                        <li>View a suspicious incident clip</li>
                        <li>View recordings of all students who have completed the exam</li>
                        <li>View the flagging log after the exam</li>
                        <li>View exam schedule</li>
                        <li>Schedule an Exam</li>
                        <li>Start an Exam (and view the live feed from the exam)</li>
                        <li>Manage classes</li>
                    </ul>
                </ul>

                <h3 className="text">Cautions & Warnings</h3>

                <div className="image-text-container">
                    <img src={WarningIcon} className="icon-image"></img><p>Security: The Sentinel system uses authentication measures, parses middleware and also has data secured in a secured database to ensure that all sensitive information is kept secure. Although password complexity is not enforced during login, users are encouraged to utilise complex passwords for additional account security.</p>
                </div>

                <p>All login methods lead to different types of homepages depending on which user is currently signed in. Each account is secured with an email and a password that has been provided by the university and is unique to each user in our system.</p>
            
                <p>Utilising MongoDB to store user information ensures an increased information security because of the data encryption in the MongoDB software. Only authorised users can access the data stored in MongoDB. When paired with the password encryption and salting, the system provides a high level of system security. </p>
            
                <div className="image-text-container">
                    <img src={InfoIcon} className="icon-image"></img><p>Tokenisation: The Sentinel application utilises tokenisation techniques to increase convenience and efficiency for the user utilising our application. Because tokenisation reduces the sign in attempts, the security of the account may be decreased. Users must be more vigilant about giving access to their device when signed into the Sentinel Application. </p>
                </div>

                <div className="image-text-container">
                    <img src={InfoIcon} className="icon-image"></img><p>Privacy Policy: Before the user begins their exam, they will be brought into an exam waiting room where they will have a Privacy Policy displayed on their screen with a tickbox. For the user to begin their exam, they must first accept the privacy policy. This ensures that the user is aware about the cautions and warnings associated with the Sentinel System. </p>
                </div>
            </div>
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