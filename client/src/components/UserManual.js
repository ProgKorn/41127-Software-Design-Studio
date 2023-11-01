import React, { useEffect, useState } from "react";
import '../css/UserManual.css';
import { Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import UM1 from '../helpCentreResources/UM1.png';
import UM2 from '../helpCentreResources/UM2.png';
import UM3 from '../helpCentreResources/UM3.png';
import UM4 from '../helpCentreResources/UM4.png';
import UM5 from '../helpCentreResources/UM5.png';
import UM6 from '../helpCentreResources/UM6.png';
import UM7 from '../helpCentreResources/UM7.png';
import UM8 from '../helpCentreResources/UM8.png';
import UM9 from '../helpCentreResources/UM9.png';
import UM10 from '../helpCentreResources/UM10.png';
import UM11 from '../helpCentreResources/UM11.png';
import UM12 from '../helpCentreResources/UM12.png';
import UM13 from '../helpCentreResources/UM13.png';
import UM14 from '../helpCentreResources/UM14.png';
import UM15 from '../helpCentreResources/UM15.png';
import UM16 from '../helpCentreResources/UM16.png';
import UM17 from '../helpCentreResources/UM17.png';
import UM18 from '../helpCentreResources/UM18.png';
import UM19 from '../helpCentreResources/UM19.png';
import UM20 from '../helpCentreResources/UM20.png';
import UM21 from '../helpCentreResources/UM21.png';
import UM22 from '../helpCentreResources/UM22.png';
import UM23 from '../helpCentreResources/UM23.png';
import UM24 from '../helpCentreResources/UM24.png';
import UM25 from '../helpCentreResources/UM25.png';
import UM26 from '../helpCentreResources/UM26.png';
import UM27 from '../helpCentreResources/UM27.png';
import UM28 from '../helpCentreResources/UM28.png';
import UM29 from '../helpCentreResources/UM29.png';
import UM30 from '../helpCentreResources/UM30.png';
import LightBulbIcon from '../helpCentreResources/UMLightBulb.png';
import InfoIcon from '../helpCentreResources/UMInfo.jpg';
import WarningIcon from '../helpCentreResources/UMWarning.jpg';

const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    backgroundColor: "#ef233c",
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    '&.MuiButton-root:hover':{bgcolor: '#8d99ae'},
    marginBottom: '2%',
    marginTop: '2%',
    '&:hover': {
        backgroundColor: '#a03421'
    },
}

const HighlightedText = ({ text, searchTerm }) => {
    if (!searchTerm) {
        return <p>{text}</p>;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);

    return (
        <p>
            {parts.map((part, index) =>
                regex.test(part) ? <mark key={index}>{part}</mark> : part
            )}
        </p>
    );
};

function Introduction( {onBackButtonClick, searchTerm} ) {
    return (
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className="text">Introduction</h2>
            </header>
            <div className="info-dump">
                <HighlightedText text="This User Manual (UM) provides the information necessary for students and examiners to effectively use the Sentinel web application which uses Artificial Intelligence (AI) software to prevent misconduct during exams. This application aims to enable examiners to detect misconduct easily and allow students to perform their respective exams while being monitored in the easiest way possible." searchTerm={searchTerm}/>

                <HighlightedText text="The scope of this application was to deliver a web-based application to schools that could revitalize the way schools hold their online exams. Given this scope, the main requirements that the business analyst was able to derive from the perspective of both the students and the examiners includes the following:" searchTerm={searchTerm}/>

                <ul>
                    <li><HighlightedText text="To be able to verify the student’s identity upon login." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="To flag any incidents of misconduct during an exam." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="To be able to terminate a student’s exam when there are two flagged incidents." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="To keep a log of incidents for each exam." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="To keep full-length videos of students where misconduct was not detected." searchTerm={searchTerm}/></li>
                </ul>

                <HighlightedText text="In the event of a system or software update (including bug fixes and the creation of additional features), newer versions of this user manual will be released to keep up with these changes." searchTerm={searchTerm}/>

                <HighlightedText text="Because the student’s camera feed and all user information (including that of the examiner) is being stored, it is essential to have privacy protection software. All video information stored on the database will be encrypted and will require user authentication. Passwords stored on the system will be salted and password complexity will also be enforced. Data privacy and protection is at the core of the Sentinel AI Cheating Detection Software." searchTerm={searchTerm}/>
                
                <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                    Back to User Manual
                </Button>
            </div>
        </Paper> 
    );
}
function Overview( {onBackButtonClick, searchTerm} ) {
    return ( 
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className="text">Overview</h2>
            </header>
            <div className="info-dump">
                <HighlightedText text="The Sentinel Web-Based Application is an AI Anti-Cheating Detection Software that was created to facilitate online exams and detect cheating incidents with ease. Our system integrates features that are separately accessible to both the students and the examiners. For the examiner side, this system will allow them to easily detect misconduct incidents and allow them to easily terminate an exam. They are also able to go back and review cheating incidents which will be stored on the database. This will reduce the need for constant monitoring on the examiners end and will ensure that students also have a fair assessment of their learning." searchTerm={searchTerm}/>

                <HighlightedText text="Since the beginning of COVID-19, most if not all educational institutions have turned to online modes of learning. With the shift to online learning, students can more easily access information at their disposal than ever before. However, this means that they also have an opportunity to misuse data including using the internet and other resources to cheat during exams (Newton, 2023). Our aim in developing this product was to reduce cheating incidents and to ensure fairness and equality when taking online exams. In order to reduce wrongful termination during a student’s exam, the examiner has the ability to accept or decline the termination if two warnings are given. An extra exam log post exam will show the flagged incidents and allow the examiner to access the clip of the cheating incident." searchTerm={searchTerm}/>

                <HighlightedText text="To use the system, the users will be authenticated based on the student/staff email address and password provided by the university." searchTerm={searchTerm}/>

                <h5 className="terms">Conventions</h5>

                <img src={UM1} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 1: Introduction to Sentinel" searchTerm={searchTerm}/></h5>

                <div className="image-text-container">
                    <img src={LightBulbIcon} className="icon-image"></img><HighlightedText text="Figure 1 provides a high-level view of the student flagging process and how each component of our anti cheating system interacts with one another. Data is stored in the MongoDB Database which is hosted separately from the Sentinel System. The user uses the browser through the React Front-end design to interact with different pages of the system." searchTerm={searchTerm}/>
                </div>

                <HighlightedText text="The main functions of our system include but are not limited to:" searchTerm={searchTerm}/>

                <ul>
                    <li><HighlightedText text="Login - There are two different logins for the student and examiner user. Each login will bring the user to different home screens with different access rights." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="Student Functionality" searchTerm={searchTerm}/></li>
                    <ul>
                        <li><HighlightedText text="View past Examinations" searchTerm={searchTerm}/></li>
                        <li><HighlightedText text="View scheduled proctored examinations" searchTerm={searchTerm}/></li>
                        <li><HighlightedText text="Start a proctored examination session" searchTerm={searchTerm}/></li>
                        <li><HighlightedText text="Test their equipment before the exam" searchTerm={searchTerm}/></li>
                    </ul>
                    <li><HighlightedText text="Examiner Functionality" searchTerm={searchTerm}/></li>
                    <ul>
                        <li><HighlightedText text="View a suspicious incident clip" searchTerm={searchTerm}/></li>
                        <li><HighlightedText text="View recordings of all students who have completed the exam" searchTerm={searchTerm}/></li>
                        <li><HighlightedText text="View the flagging log after the exam" searchTerm={searchTerm}/></li>
                        <li><HighlightedText text="View exam schedule" searchTerm={searchTerm}/></li>
                        <li><HighlightedText text="Schedule an Exam" searchTerm={searchTerm}/></li>
                        <li><HighlightedText text="Start an Exam (and view the live feed from the exam)" searchTerm={searchTerm}/></li>
                        <li><HighlightedText text="Manage classes" searchTerm={searchTerm}/></li>
                    </ul>
                </ul>

                <h5 className="terms">Cautions & Warnings</h5>

                <div className="image-text-container">
                    <img src={WarningIcon} className="icon-image"></img><HighlightedText text="Security: The Sentinel system uses authentication measures, parses middleware and also has data secured in a secured database to ensure that all sensitive information is kept secure. Although password complexity is not enforced during login, users are encouraged to utilise complex passwords for additional account security." searchTerm={searchTerm}/>
                </div>

                <HighlightedText text="All login methods lead to different types of homepages depending on which user is currently signed in. Each account is secured with an email and a password that has been provided by the university and is unique to each user in our system." searchTerm={searchTerm}/><p></p>
            
                <HighlightedText text="Utilising MongoDB to store user information ensures an increased information security because of the data encryption in the MongoDB software. Only authorised users can access the data stored in MongoDB. When paired with the password encryption and salting, the system provides a high level of system security." searchTerm={searchTerm}/>
            
                <div className="image-text-container">
                    <img src={InfoIcon} className="icon-image"></img><HighlightedText text="Tokenisation: The Sentinel application utilises tokenisation techniques to increase convenience and efficiency for the user utilising our application. Because tokenisation reduces the sign in attempts, the security of the account may be decreased. Users must be more vigilant about giving access to their device when signed into the Sentinel Application." searchTerm={searchTerm}/>
                </div>

                <div className="image-text-container">
                    <img src={InfoIcon} className="icon-image"></img><HighlightedText text="" searchTerm={searchTerm}/><p>Privacy Policy: Before the user begins their exam, they will be brought into an exam waiting room where they will have a Privacy Policy displayed on their screen with a tickbox. For the user to begin their exam, they must first accept the privacy policy. This ensures that the user is aware about the cautions and warnings associated with the Sentinel System. </p>
                </div>
            </div>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to User Manual
            </Button>
        </Paper>
    );
}
function GettingStarted( {onBackButtonClick, searchTerm} ) {
    return ( 
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className="text">Getting Started</h2>
            </header>
            <div className="info-dump">
                <HighlightedText text="This Sentinel application is accessible through “Sentinel.com” through any browser such as Firefox, Google Chrome or Safari on any operating system of choice. Once the user has launched the website, they will be brought to the landing page to either visit the Help Centre or log into the Sentinel system. A screenshot of both the Landing page, Login pages and Home pages are placed below." searchTerm={searchTerm}/>
                <img src={UM2} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 2: Example Sentinel Landing Page" searchTerm={searchTerm}/></h5>

                <HighlightedText text="After the user has entered the URL into their desired search browser, they will be brought to the homepage shown above. The user can choose the “Sign In” button to log into their account and view functions within the account." searchTerm={searchTerm}/>
                <img src={UM3} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 3: Email Login Page" searchTerm={searchTerm}/></h5>

                <HighlightedText text="Once the user has placed their email, they will be redirected to their respective login page (student or admin login)." searchTerm={searchTerm}/>
                <img src={UM4} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 4: Admin Login Page" searchTerm={searchTerm}/></h5>
                <img src={UM5} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 5: Student Login Page" searchTerm={searchTerm}/></h5>

                <HighlightedText text="The admin will be prompted to login with a username and password while the student login utilises facial login, reducing the risk of cheating incidence by increasing login complexity." searchTerm={searchTerm}/>
                <img src={UM6} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 6: Admin Home Page" searchTerm={searchTerm}/></h5>
                <img src={UM7} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 7: Student Home Page" searchTerm={searchTerm}/></h5>

                <HighlightedText text="The users will be brought to their respective homepages after successful login." searchTerm={searchTerm}/>

                <h5 className="terms">Set-up Considerations</h5>

                <div className="image-text-container">
                    <img src={InfoIcon} className="icon-image"></img> <HighlightedText text="The Sentinel system requires constant internet connection to continue using the system and to detect cheating instances accurately. To ensure that the internet is connected on an Apple MacBook, navigate to the wifi symbol located on the menu bar on your screen and connect to your desired internet network." searchTerm={searchTerm}/>
                </div>
                <img src={UM8} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 8: Connecting to the Internet" searchTerm={searchTerm}/></h5>

                <HighlightedText text="This application is designed to access your camera and your microphone to detect instances of cheating. To optimise your access to Sentinel:" searchTerm={searchTerm}/>
                <ul>
                    <li><HighlightedText text="Please enable pop-up blockers prior to attempting access to Sentinel." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="Enable the camera and microphone access on Chrome before accessing Sentinel by clicking on the lock button on the upper left hand corner of the navigation bar." searchTerm={searchTerm}/></li>
                    <ul>
                        <li><HighlightedText text="Please use the button “Run System Test” on the Sentinel system to ensure that your device is working." searchTerm={searchTerm}/></li>
                    </ul>
                </ul>
                <img src={UM9} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 9: Allowing Access to the Camera and Microphone" searchTerm={searchTerm}/></h5>

                <h5 className="terms">User Access Considerations</h5>

                <HighlightedText text="For the Sentinel software, there are two types of users that log into their specific homepage based on the corresponding user types: student and examiner. The two users have different home pages after login and have different functionality in each user type. Both accounts have the ability to view upcoming exams and previous exams (but are formatted differently). Examiners have the ability to schedule new exams, view suspicious clips of a student, view a flag log after an examination and terminate a student’s exams after two subsequent flags have been raised. Additionally, they are also able to view all students currently sitting the exam. The student access on the other hand is limited to exam access and does not have any of the examiner functionality except viewing exams." searchTerm={searchTerm}/>

                <h5 className="terms">Accessing the Software</h5>

                <HighlightedText text="To access the Sentinel software, there are two types of sign-in modes depending on the user type. The examiner login utilises an email and password login while the student login utilises facial recognition software to log in. If the examiner logging in does not have valid login details or if they have forgotten their login details, they must contact the institution’s information technology department to solve this issue and receive their login details. In the case of the student login, they must lodge an external form that will upload their facial data and landmarks into the system, enabling them to log in. Common issues relating to Facial Authentication for students will be in the Help Centre '>' Face Auth Troubleshoot. For privacy purposes, the users will not be allowed to change their login details directly on the Sentinel application. To easily contact the IT department, go to the Help Centre '>' Contact Us." searchTerm={searchTerm}/>
                <img src={UM10} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 10: Sample of Sentinel Help Centre" searchTerm={searchTerm}/></h5>

                <h5 className="terms">Software Organisation and Navigation</h5>

                <HighlightedText text="For different types of users, there are different menu options or ways to navigate through the Sentinel system. When the user inputs the URL into their browser, they will be brought to the main page where they can choose to Sign In or view the Help Centre." searchTerm={searchTerm}/>
                <img src={UM11} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 11: Sentinel Home Page" searchTerm={searchTerm}/></h5>

                <h5 className="terms">Examiner Account</h5>
                <HighlightedText text="These are the main functionalities provided to an admin account:" searchTerm={searchTerm}/>
                <h5 className="account-subheading"><HighlightedText text="Login/Home Functions" searchTerm={searchTerm}/></h5>
                <ul>
                    <li><HighlightedText text="Login - If the user has previously received login details from their IT department, they are able to easily log into the sentinel system by signing up with their username and password." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="Home - When the examiner is logged in, they can press the Home button on the menu bar above to navigate back to the homepage." searchTerm={searchTerm}/></li>
                </ul>
                <img src={UM12} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 11: Admin Dashboard" searchTerm={searchTerm}/></h5>

                <h5 className="account-subheading"><HighlightedText text="View Exams" searchTerm={searchTerm}/></h5>
                <ul>
                    <li><HighlightedText text="Login - The examiner must be logged in to their account to perform the functions below." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="View Exam Schedule - Select the Schedule button from the menu bar above." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="Create an Exam Session - Select the Create Session Icon on the tiled menu displayed on the screen." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="View Exam History - Select the Exam History Icon on the tiled menu displayed on the screen." searchTerm={searchTerm}/></li>
                </ul>

                <h5 className="account-subheading"><HighlightedText text="Examination Functionality" searchTerm={searchTerm}/></h5>
                <ul>
                    <li><HighlightedText text="Login - The examiner must be logged into their account to perform the functions below." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="Launch an Exam - Select the Launch Exam Icon on the tiled menu displayed on the screen." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="View Flagged Activity - Select the Activity button on the menu bar above." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="Manage Classes - Select the Manage Classes Icon on the tiled menu displayed on the screen." searchTerm={searchTerm}/></li>
                </ul>

                <h5 className="terms">Student Account</h5>
                <HighlightedText text="These are the main functionalities provided to a student account:" searchTerm={searchTerm}/>
                <h5 className="account-subheading"><HighlightedText text="Login/Home Functions" searchTerm={searchTerm}/></h5>
                <ul>
                    <li><HighlightedText text="Login - If the user has previously signed up for a Sentinel account through an external form lodged with the IT Department, they should be able to sign in simply by using their facial data." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="Home - When the Student is logged in, they can press the Home button on the menu bar above to navigate back to the Student Homepage." searchTerm={searchTerm}/></li>
                </ul>

                <h5 className="account-subheading"><HighlightedText text="Exams" searchTerm={searchTerm}/></h5>
                <ul>
                    <li><HighlightedText text="Login - The student must be logged into their account to perform the functions below." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="View Previous Exams  - Select the “View Previous Exams” button on the upper-right corner of the Upcoming Exams table." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="Access Exam - Select the Access Exam button of the exam that you want to access." searchTerm={searchTerm}/></li>
                </ul>

                <h5 className="account-subheading"><HighlightedText text="System Test" searchTerm={searchTerm}/></h5>
                <ul>
                    <li><HighlightedText text="Login - The student must be logged into their account to perform the functions below." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="Test Your Equipment - Select the Test Your Equipment at the bottom of the page to ensure that your camera and microphone are working as intended." searchTerm={searchTerm}/></li>
                </ul>

                <h5 className="terms">Exiting the Software</h5>

                <HighlightedText text="To exit the Sentinel web application, the user must click on their profile on the upper-right hand corner of the menu bar followed by “Sign Out”. Once the user has successfully signed out, they will be redirected back to the main Sentinel page. The user can choose to exit the page upon being redirected to the main page." searchTerm={searchTerm}/>
                <img src={UM13} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 13: Admin Signout" searchTerm={searchTerm}/></h5>

            </div>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to User Manual
            </Button>
        </Paper>
    );
}
function UsingTheSoftware( {onBackButtonClick, searchTerm} ) {
    return ( 
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className="text">Using The Software</h2>
            </header>
            <div className="info-dump">

                <HighlightedText text="The following subsections provide detailed, step-by-step instructions on how to use the various functions or features of the Sentinel AI Anti-Cheating Detection Software." searchTerm={searchTerm}></HighlightedText>
            
                <h5 className="terms">Student Functions</h5>

                <h2 className="softwareSubHeading"><HighlightedText text="Login" searchTerm={searchTerm}/></h2>
                <HighlightedText text="Students using the Sentinel web application can log into their user account which provides access to all features of the system that have been assigned to them. The purpose of creating the FaceID login method is to ensure that the student can be properly authenticated and reinforce the anti-cheating purpose of our software. For more information on accessing the system, please refer to Section 3: Getting Started." searchTerm={searchTerm}></HighlightedText>
            
                <h2 className="softwareSubHeading"><HighlightedText text="Student Homepage" searchTerm={searchTerm}/></h2>
                <HighlightedText text="After logging into the system, the student will be brought to the student homepage where they can access functions such as viewing their student details and viewing upcoming  & previous exams." searchTerm={searchTerm}></HighlightedText>
                <img src={UM15} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 15: Student Homepage" searchTerm={searchTerm}/></h5>

                <h2 className="softwareSubHeading"><HighlightedText text="View Student Details" searchTerm={searchTerm}/></h2>
                <HighlightedText text="When the user wants to view their current Student Details, they will be displayed on a table on the left-hand side of the screen. This table contains information such as the student’s first name, last name, student ID and email." searchTerm={searchTerm}></HighlightedText>
                <img src={UM16} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 16: Student Details Table" searchTerm={searchTerm}/></h5>

                <h2 className="softwareSubHeading"><HighlightedText text="View Previous Exams" searchTerm={searchTerm}/></h2>
                <HighlightedText text="When the user wants to view the previous exams that they have taken/joined, they can navigate to the table on the bottom of the screen which contains information such as the upcoming exams table above it." searchTerm={searchTerm}></HighlightedText>
                <img src={UM17} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 17: Previous Exams Table" searchTerm={searchTerm}/></h5>

                <h2 className="softwareSubHeading"><HighlightedText text="View Upcoming Exams" searchTerm={searchTerm}/></h2>
                <HighlightedText text="When the user wants to view their upcoming exams, they can navigate to the right-hand table of the screen which showcases the upcoming exams including the exam name, exam start, details and seat number." searchTerm={searchTerm}></HighlightedText>
                <img src={UM18} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 18: Upcoming Exams Table" searchTerm={searchTerm}/></h5>

                <h2 className="softwareSubHeading"><HighlightedText text="Access Exam" searchTerm={searchTerm}/></h2>
                <HighlightedText text="When the student wants to join an exam session that they are scheduled for, they can click the “Access Exam” button on the Upcoming Exams table for the specific exam they want to join. This will redirect them into a waiting room before they begin the exam (exam session)." searchTerm={searchTerm}></HighlightedText>

                <h2 className="softwareSubHeading"><HighlightedText text="Exam Session" searchTerm={searchTerm}/></h2>
                <HighlightedText text="After the student selects the Access Exam button from the student homepage, they will be redirected first from the Exam Waiting Room (otherwise known as the Exam Start page) then to the actual proctored Exam Session." searchTerm={searchTerm}></HighlightedText>

                <h2 className="softwareSubHeading"><HighlightedText text="Exam Waiting Room (Exam Start Page)" searchTerm={searchTerm}/></h2>
                <HighlightedText text="When inside the Exam Waiting Room, the student can view the details of the exam in the top table, they can then view the terms and conditions below. A scroll bar is available to view the content of the terms and conditions. Before being able to proceed they must agree to the terms and conditions by checking the box." searchTerm={searchTerm}></HighlightedText>
                <img src={UM19} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 19: Exam Start Page" searchTerm={searchTerm}/></h5>

                <h2 className="softwareSubHeading"><HighlightedText text="Pre-Exam Verification" searchTerm={searchTerm}/></h2>
                <HighlightedText text="Before beginning the actual exam session, the student is required to scan their table for banned objects. This ensures that the student does not have any tools they can use for cheating that may not be detected during the exam. After the area has been scanned, the student can press the Continue button which will allow them to enter the exam session." searchTerm={searchTerm}></HighlightedText>
                <img src={UM20} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 20: Pre-Exam Verification Screen" searchTerm={searchTerm}/></h5>

                <h2 className="softwareSubHeading"><HighlightedText text="Exam Session" searchTerm={searchTerm}/></h2>
                <HighlightedText text="When the exam begins, the student is automatically moved from the waiting room to the exam session. During this session, object recognition and facial landmark detection runs to ensure that a student is not cheating during the examination." searchTerm={searchTerm}></HighlightedText>
                <img className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 21: Exam Session Screen" searchTerm={searchTerm}/></h5>

                <h2 className="softwareSubHeading"><HighlightedText text="Exam Flags" searchTerm={searchTerm}/></h2>
                <HighlightedText text="As previously mentioned, once the exam begins, the anti-cheating software also begins. When a student commits any activities that are considered misconduct (as listed in Appendix G.7: Assumptions), they will be flagged by the system. An example of a flagging warning has been shown below." searchTerm={searchTerm}></HighlightedText>
                <img src={UM21} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 22: Sample of an Exam Flag" searchTerm={searchTerm}/></h5>

                <h2 className="softwareSubHeading"><HighlightedText text="Exam Terminated" searchTerm={searchTerm}/></h2>
                <HighlightedText text="When the student has received two flagging warnings, their exam session can be terminated (based on the manual approval of the examiner). If the exam session was terminated, the student will be redirected to this page below. From this page, they can go back to the student homepage." searchTerm={searchTerm}></HighlightedText>
                <img src={UM22} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 23: Exam Terminated Screen" searchTerm={searchTerm}/></h5>

                <h2 className="softwareSubHeading"><HighlightedText text="Exam Complete" searchTerm={searchTerm}/></h2>
                <HighlightedText text="After the exam has completed, the student will be redirected to an Exam Complete page where they will be redirected back to the student home page." searchTerm={searchTerm}></HighlightedText>
                <img src={UM23} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 24: Exam Complete Screen" searchTerm={searchTerm}/></h5>

                <h5 className="terms">Student Functions</h5>

                <h2 className="softwareSubHeading"><HighlightedText text="View the Admin Dashboard" searchTerm={searchTerm}/></h2>
                <HighlightedText text="Examiners using the Sentinel Web Application can log into their user account which provides access to all of the admin functions which will be outlined below. For more information on accessing the system, please refer to Section 3: Getting Started." searchTerm={searchTerm}></HighlightedText>
                <img src={UM24} className="image"></img>
                <h5 className="figure-heading"><HighlightedText text="Figure 25: Admin Dashboard Screen" searchTerm={searchTerm}/></h5>
                <HighlightedText text="The admin navigation bar, featured at the top of the dashboard (in addition to all administrative pages) features shortcuts to:" searchTerm={searchTerm}></HighlightedText>
                <ul>
                    <li><HighlightedText text="The Home Page (see Figure 25)" searchTerm={searchTerm}></HighlightedText></li>
                    <li><HighlightedText text="The Exam Schedule (see Figure 32)" searchTerm={searchTerm}></HighlightedText></li>
                    <li><HighlightedText text="The Flag Log (see Figure 27)" searchTerm={searchTerm}></HighlightedText></li>
                    <li><HighlightedText text="The Help Centre (see Figure 10)" searchTerm={searchTerm}></HighlightedText></li>
                </ul>

            </div>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to User Manual
            </Button>
        </Paper>
    );
}
function Troubleshooting( {onBackButtonClick, searchTerm} ) {  
    return ( 
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className="text">Troubleshooting And Support</h2>
            </header>

            <div className="info-dump">
            <HighlightedText text="There are several error messages and remediation actions embedded into Sentinel to enable a smooth and easy user experience across the site. These messages have been detailed with the process, description, and where necessary, the remediation strategy. Sentinel is currently in beta testing and open to bug fix and error handling suggestions." searchTerm={searchTerm}/>
            
                <h5 className="terms">Error Messages</h5>
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><HighlightedText text="Error Message" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Location" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Context" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Remediation" searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Internal Server Error”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Across the Site" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="This error usually indicates connectivity issues to the backend from either severed connections, latency and loading issues, or deployment misconfigurations." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Raise a ticket with Sentinel and the developers will investigate whether the server requires a restart or configuration change." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Login failed: Invalid credentials”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin and Student Login Forms" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="There is a mismatch between username/email and password (or facial data). The username does exist." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Enter the correct password and ensure facial data is being used against the correct username/email. If the password has been forgotten, contact the university." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><HighlightedText text="“Login failed: User not found”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin and Student Login Forms" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="The username/email does not exist in the database, and therefore, has not been registered to Sentinel by the university." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Contact the university to register the correct email address to the user." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><HighlightedText text="“Login failed: Internal Server Error”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin and Student Login Forms" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="The backend server has failed or the post request did not go through in time." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Raise a ticket with Sentinel and the developers will investigate whether the server requires a restart or permission change." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Login failed: Facial data does not match any existing users in the database”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Student Login Forms" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="The facial data from the webcam does not match the student ID photo of the corresponding user." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Log in using the correct email address or retry the camera in brighter lighting." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Document not found or not updated”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Student Exam" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="The details relating to the video of the cheating behaviour either do not fully align or is a duplicate of an existing database entry." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Ensure the student and cheating details are valid and are unique. If the issue persists, contact Sentinel." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Error saving video”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Student Exam" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="The video could not be saved due to a connectivity or database issue." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Refresh the page and try again. Contact Sentinel administrators if the issue persists. " searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Error: An error occurred while searching for the student.”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Class Details Page" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="A student could either not be found or a database connection occurred." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Ensure a valid student ID is inputted, refresh the page, or contact Sentinel if the issue persists." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Error: No Class Name Provided”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin Create Class Page" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="A class name was not provided when creating a class." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Enter a class name into the form." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Error: No Subject Id Provided”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin Create Class Page" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="A subject ID has not been provided on the create class page." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Enter a subject ID into the form." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Error: Subject Id not a number”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin Create Class Page" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="The type of the subject ID is not valid." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Enter a numerical value as the subject ID." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Error encountered while saving form”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin Create Session Page" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="The form was unable to save due to network, validation, or loading issues." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Check for validation errors, refresh, and attempt to resubmit." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Error: Exam end time occurs before start time.”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin Create Session Page" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="" searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Error: No Exam Name Provided”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin Create Session Page" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="" searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Error: No Start Time Provided”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin Create Session Page" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="" searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“Error: No End Time Provided”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Admin Create Session Page" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="An end time has not been provided in the create session page." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Add a valid end time." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="“You do not have permission to access this page”" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="No Access page" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="The user is either not logged on or does not have the correct permissions to view the page." searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Log in with an account corresponding to the correct user role to view content." searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <h5 className="terms">Special Considerations</h5>

                <HighlightedText text="Certain special considerations have been made, particularly as the system is in early stages of development and user acceptance testing is in progress. On rare occasions, a user will be presented with a “No Access” screen despite logging in successfully under an account with correct privileges. This is due to the request processing quickly that the token cannot be read before the component is loaded. A simple page refresh will remediate this." searchTerm={searchTerm}/>

                <h5 className="terms">Support</h5>

                <HighlightedText text="Although Sentinel has done due diligence in troubleshooting major bugs, dynamic systems and unique user interactions may still result in errors arising. Since the system is enabled by tertiary education institutions, support relating to password resets, examination queries, and flagging negotiations are directed to the relevant institution through the contact page linked in the top-right side of ribbon. For the table below, the University of Technology Sydney (UTS) was taken as an example due to the initial beta rollout being for staff and students at UTS. However, system related errors such as slow processing times, access requirements, and incorrect data can be directed to Sentinel through our incident management system or by directly contacting Sentinel support." searchTerm={searchTerm}/>
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><HighlightedText text="Contact" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Phone" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Email" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Role" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Responsibility" searchTerm={searchTerm}/></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><HighlightedText text="Tertiary Education Institute (UTS)" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="+61 2 9514 2000" searchTerm={searchTerm}></HighlightedText></TableCell>
                                <TableCell><HighlightedText text="Email varies depending on faculty." searchTerm={searchTerm}></HighlightedText></TableCell>
                                <TableCell><HighlightedText text="Account and Exam Manager, Academic Integrity Support" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Grant students access to the system by adding them to the database, manage exam details and classrooms, manage administrators/examiners." searchTerm={searchTerm}></HighlightedText></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><HighlightedText text="Sentinel Incident Management" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="+61 2 9876 5432" searchTerm={searchTerm}></HighlightedText></TableCell>
                                <TableCell><HighlightedText text="support@sentinel.com" searchTerm={searchTerm}></HighlightedText></TableCell>
                                <TableCell><HighlightedText text="System Manager, Technical Support" searchTerm={searchTerm}/></TableCell>
                                <TableCell><HighlightedText text="Assist with site availability and troubleshooting, action user requests and feedback, fix defects, and answer questions about functionality." searchTerm={searchTerm}></HighlightedText></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to User Manual
            </Button>
        </Paper>
    );
}

export {Introduction, Overview, GettingStarted, UsingTheSoftware, Troubleshooting};