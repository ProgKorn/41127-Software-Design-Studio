import React, { useEffect, useState } from "react";
import '../css/UserManual.css';
import { Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import UM1 from '../userManualResources/UM1.png';
import UM2 from '../userManualResources/UM2.png';
import UM3 from '../userManualResources/UM3.png';
import UM4 from '../userManualResources/UM4.png';
import UM5 from '../userManualResources/UM5.png';
import UM6 from '../userManualResources/UM6.png';
import UM7 from '../userManualResources/UM7.png';
import UM8 from '../userManualResources/UM8.png';
import UM9 from '../userManualResources/UM9.png';
import UM10 from '../userManualResources/UM10.png';
import UM11 from '../userManualResources/UM11.png';
import UM12 from '../userManualResources/UM12.png';
import UM13 from '../userManualResources/UM13.png';
import LightBulbIcon from '../userManualResources/UMLightBulb.png';
import InfoIcon from '../userManualResources/UMInfo.jpg';
import WarningIcon from '../userManualResources/UMWarning.jpg';

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

function Introduction( {onBackButtonClick} ) {
    return (
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
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
        </Paper> 
    );
}
function Overview( {onBackButtonClick} ) {
    return ( 
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className="text">Overview</h2>
            </header>
            <div className="info-dump">
                <p>The Sentinel Web-Based Application is an AI Anti-Cheating Detection Software that was created to facilitate online exams and detect cheating incidents with ease. Our system integrates features that are separately accessible to both the students and the examiners. For the examiner side, this system will allow them to easily detect misconduct incidents and allow them to easily terminate an exam. They are also able to go back and review cheating incidents which will be stored on the database. This will reduce the need for constant monitoring on the examiners end and will ensure that students also have a fair assessment of their learning.</p>

                <p>Since the beginning of COVID-19, most if not all educational institutions have turned to online modes of learning. With the shift to online learning, students can more easily access information at their disposal than ever before. However, this means that they also have an opportunity to misuse data including using the internet and other resources to cheat during exams (Newton, 2023). Our aim in developing this product was to reduce cheating incidents and to ensure fairness and equality when taking online exams. In order to reduce wrongful termination during a student’s exam, the examiner has the ability to accept or decline the termination if two warnings are given. An extra exam log post exam will show the flagged incidents and allow the examiner to access the clip of the cheating incident.</p>

                <p>To use the system, the users will be authenticated based on the student/staff email address and password provided by the university.</p>

                <h1 className="text">Conventions</h1>

                <img src={UM1} className="image"></img>
                <h5 className="figure-heading">Figure 1: Introduction to Sentinel</h5>

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

                <h1 className="text">Cautions & Warnings</h1>

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
        </Paper>
    );
}
function GettingStarted( {onBackButtonClick} ) {
    return ( 
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className="text">Getting Started</h2>
            </header>
            <div className="info-dump">
                <p>This Sentinel application is accessible through “Sentinel.com” through any browser such as Firefox, Google Chrome or Safari on any operating system of choice. Once the user has launched the website, they will be brought to the landing page to either visit the Help Centre or log into the Sentinel system. A screenshot of both the Landing page, Login pages and Home pages are placed below.</p>
                <img src={UM2} className="image"></img>
                <h5 className="figure-heading">Figure 2: Example Sentinel Landing Page</h5>

                <p>After the user has entered the URL into their desired search browser, they will be brought to the homepage shown above. The user can choose the “Sign In” button to log into their account and view functions within the account.</p>
                <img src={UM3} className="image"></img>
                <h5 className="figure-heading">Figure 3: Email Login Page</h5>

                <p>Once the user has placed their email, they will be redirected to their respective login page (student or admin login).</p>
                <img src={UM4} className="image"></img>
                <h5 className="figure-heading">Figure 4: Admin Login Page</h5>
                <img src={UM5} className="image"></img>
                <h5 className="figure-heading">Figure 5: Student Login Page</h5>

                <p>The admin will be prompted to login with a username and password while the student login utilises facial login, reducing the risk of cheating incidence by increasing login complexity.</p>
                <img src={UM6} className="image"></img>
                <h5 className="figure-heading">Figure 6: Admin Home Page</h5>
                <img src={UM7} className="image"></img>
                <h5 className="figure-heading">Figure 7: Student Home Page</h5>

                <p>The users will be brought to their respective homepages after successful login.</p>

                <h1 className="text">Set-up Considerations</h1>

                <div className="image-text-container">
                    <img src={InfoIcon} className="icon-image"></img> <p>The Sentinel system requires constant internet connection to continue using the system and to detect cheating instances accurately. To ensure that the internet is connected on an Apple MacBook, navigate to the wifi symbol located on the menu bar on your screen and connect to your desired internet network.</p>
                </div>
                <img src={UM8} className="image"></img>
                <h5 className="figure-heading">Figure 8: Connecting to the Internet</h5>

                <p>This application is designed to access your camera and your microphone to detect instances of cheating. To optimise your access to Sentinel:</p>
                <ul>
                    <li>Please enable pop-up blockers prior to attempting access to Sentinel.</li>
                    <li>Enable the camera and microphone access on Chrome before accessing Sentinel by clicking on the lock button on the upper left hand corner of the navigation bar.</li>
                    <ul>
                        <li>Please use the button “Run System Test” on the Sentinel system to ensure that your device is working. </li>
                    </ul>
                </ul>
                <img src={UM9} className="image"></img>
                <h5 className="figure-heading">Figure 9: Allowing Access to the Camera and Microphone</h5>

                <h1 className="text">User Access Considerations</h1>

                <p>For the Sentinel software, there are two types of users that log into their specific homepage based on the corresponding user types: student and examiner. The two users have different home pages after login and have different functionality in each user type. Both accounts have the ability to view upcoming exams and previous exams (but are formatted differently). Examiners have the ability to schedule new exams, view suspicious clips of a student, view a flag log after an examination and terminate a student’s exams after two subsequent flags have been raised. Additionally, they are also able to view all students currently sitting the exam. The student access on the other hand is limited to exam access and does not have any of the examiner functionality except viewing exams.</p>

                <h1 className="text">Accessing the Software</h1>

                <p>To access the Sentinel software, there are two types of sign-in modes depending on the user type. The examiner login utilises an email and password login while the student login utilises facial recognition software to log in. If the examiner logging in does not have valid login details or if they have forgotten their login details, they must contact the institution’s information technology department to solve this issue and receive their login details. In the case of the student login, they must lodge an external form that will upload their facial data and landmarks into the system, enabling them to log in. Common issues relating to Facial Authentication for students will be in the Help Centre {">"} Face Auth Troubleshoot. For privacy purposes, the users will not be allowed to change their login details directly on the Sentinel application. To easily contact the IT department, go to the Help Centre {">"} Contact Us.</p>
                <img src={UM10} className="image"></img>
                <h5 className="figure-heading">Figure 10: Sample of Sentinel Help Centre</h5>

                <h1 className="text">Software Organisation and Navigation</h1>

                <p>For different types of users, there are different menu options or ways to navigate through the Sentinel system. When the user inputs the URL into their browser, they will be brought to the main page where they can choose to Sign In or view the Help Centre.</p>
                <img src={UM11} className="image"></img>
                <h5 className="figure-heading">Figure 11: Sentinel Home Page</h5>

                <h4 className="account-heading">Examiner Account</h4>
                <h5 className="account-subheading">Login/Main Functions</h5>
                <ul>
                    <li>Login - If the user has previously received login details from their IT department, they are able to easily log into the sentinel system by signing up with their username and password.</li>
                    <li>Home - When the examiner is logged in, they can press the Home button on the menu bar above to navigate back to the homepage.</li>
                </ul>
                <img src={UM12} className="image"></img>
                <h5 className="figure-heading">Figure 11: Admin Dashboard</h5>

                <h5 className="account-subheading">View Exams</h5>
                <ul>
                    <li>Login - The examiner must be logged in to their account to perform the functions below.</li>
                    <li>View Exam Schedule - Select the Schedule button from the menu bar above.</li>
                    <li>Create an Exam Session - Select the Create Session Icon on the tiled menu displayed on the screen.</li>
                    <li>View Exam History - Select the Exam History Icon on the tiled menu displayed on the screen.</li>
                </ul>

                <h5 className="account-subheading">Examination Functionality</h5>
                <ul>
                    <li>Login - The examiner must be logged into their account to perform the functions below.</li>
                    <li>Launch an Exam - Select the Launch Exam Icon on the tiled menu displayed on the screen.</li>
                    <li>View Flagged Activity - Select the Activity button on the menu bar above.</li>
                    <li>Manage Classes - Select the Manage Classes Icon on the tiled menu displayed on the screen.</li>
                </ul>

                <h4 className="account-heading">Student Account</h4>
                <h5 className="account-subheading">Main Functionality</h5>
                <ul>
                    <li>Login - If the user has previously signed up for a Sentinel account through an external form lodged with the IT Department, they should be able to sign in simply by using their facial data.</li>
                    <li>Home - When the Student is logged in, they can press the Home button on the menu bar above to navigate back to the Student Homepage.</li>
                </ul>

                <h5 className="account-subheading">Exams</h5>
                <ul>
                    <li>Login - The student must be logged into their account to perform the functions below.</li>
                    <li>View Previous Exams  - Select the “View Previous Exams” button on the upper-right corner of the Upcoming Exams table.</li>
                    <li>Access Exam - Select the Access Exam button of the exam that you want to access.</li>
                </ul>

                <h5 className="account-subheading">System Test</h5>
                <ul>
                    <li>Login - The student must be logged into their account to perform the functions below.</li>
                    <li>Test Your Equipment - Select the Test Your Equipment at the bottom of the page to ensure that your camera and microphone are working as intended.</li>
                </ul>

                <h1 className="text">Exiting the Software</h1>

                <p>To exit the Sentinel web application, the user must click on their profile on the upper-right hand corner of the menu bar followed by “Sign Out”. Once the user has successfully signed out, they will be redirected back to the main Sentinel page. The user can choose to exit the page upon being redirected to the main page.</p>
                <img src={UM13} className="image"></img>
                <h5 className="figure-heading">Figure 13: Admin Signout</h5>

            </div>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to User Manual
            </Button>
        </Paper>
    );
}
function UsingTheSoftware( {onBackButtonClick} ) {
    return ( 
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className="text">Using The Software</h2>
            </header>
            <p>Live Laugh Love</p>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to User Manual
            </Button>
        </Paper>
    );
}
function Troubleshooting( {onBackButtonClick} ) {  
    return ( 
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className="text">Troubleshooting And Support</h2>
            </header>

            <div className="info-dump">
                <p>There are several error messages and remediation actions embedded into Sentinel to enable a smooth and easy user experience across the site. These messages have been detailed with the process, description, and where necessary, the remediation strategy. Sentinel is currently in beta testing and open to bug fix and error handling suggestions.</p>
            
                <h1 className="text">Error Messages</h1>
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Error Message</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Context</TableCell>
                                <TableCell>Remediation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>“Login failed: Invalid credentials”</TableCell>
                                <TableCell>Admin and Student Login Forms</TableCell>
                                <TableCell>There is a mismatch between username/email and password (or facial data). The username does exist.</TableCell>
                                <TableCell>Enter the correct password and ensure facial data is being used against the correct username/email. If the password has been forgotten, contact the university.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>“Login failed: User does not exist”</TableCell>
                                <TableCell>Admin and Student Login Forms</TableCell>
                                <TableCell>The username/email does not exist in the database, and therefore, has not been registered to Sentinel by the university.</TableCell>
                                <TableCell>Contact the university to register the correct email address to the user.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>“Login failed: Internal Server Error”</TableCell>
                                <TableCell>Admin and Student Login Forms</TableCell>
                                <TableCell>The backend server has failed or the post request did not go through in time.</TableCell>
                                <TableCell>Raise a ticket with Sentinel and the developers will investigate whether the server requires a restart or permission change.</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <h1 className="text">Special Considerations</h1>

                <p>Certain special considerations have been made, particularly as the system is in early stages of development and user acceptance testing is in progress. On rare occasions, a user will be presented with a “No Access” screen despite logging in successfully under an account with correct privileges. This is due to the request processing quickly that the token cannot be read before the component is loaded. A simple page refresh will remediate this.</p>

                <h1 className="text">Support</h1>

                <p>Although Sentinel has made due diligence in troubleshooting major bugs, dynamic systems and unique user interactions may still enable errors to arise. Since the system is enabled by tertiary education institutions, support relating to password resets, examination queries, and flagging negotiations are directed to the relevant institution through the contact page linked in the ribbon. For the table below, the University of Technology Sydney (UTS) was taken as an example due to the initial beta rollout being for the university specifically. However, system related errors such as slow processing times, access requirements, and incorrect data can be directed to Sentinel through our incident management system.</p>
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Contact</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Responsibility</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Tertiary Education Institute (UTS)</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>Account and Exam Manager, Academic Integrity Support</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Sentinel Incident Management</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>System Manager, Technical Support</TableCell>
                                <TableCell></TableCell>
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