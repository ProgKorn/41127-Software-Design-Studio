import React, { useState } from 'react';
import '../css/HelpCentre.css';
import { Button, Paper } from '@mui/material';
import {Introduction, Overview, GettingStarted, UsingTheSoftware, Troubleshooting} from '../components/UserManual';
import GazeTracking from '../helpCentreResources/GazeTracking.png';
import MobileDetection from '../helpCentreResources/MobileDetection.png';
import UM21 from '../helpCentreResources/UM21.png';
import UM31 from '../helpCentreResources/UM31.png';

const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    backgroundColor: "#292E64",
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    '&:hover': {
        backgroundColor: '#a03421'
    },
}

const returnButtonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    backgroundColor: "#ef233c",
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    '&.MuiButton-root:hover': {bgcolor: '#8d99ae'},
    marginBottom: '3%',
    marginTop: '3%',
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

function UserManual( {onBackButtonClick} ) {
    const [selectedSection, setSelectedSection] = useState(null);

    const handleSectionClick = (sectionName) => {
        setSelectedSection(sectionName);
    }

    const handleBackButtonClick = () => {
        setSelectedSection(null);
      };

    return (
        <div>
            {!selectedSection && (
                <Paper elevation={8} className="paper-container">
                    <header className='help-centre-header'>
                        <h2 className="text">User Manual</h2>
                    </header>
                        <div className='content-container'>
                            <div className='user-manual-group'>
                                <Button variant='contained' className='subtext' onClick={() => handleSectionClick('Introduction')} sx={buttonStyles}>Introduction</Button>
                                <Button variant='contained' className='subtext' onClick={() => handleSectionClick('Overview')} sx={buttonStyles}>Overview</Button>
                                <Button variant='contained' className='subtext' onClick={() => handleSectionClick('Getting Started')} sx={buttonStyles}>Getting Started</Button>
                                <Button variant='contained' className='subtext' onClick={() => handleSectionClick('Using the Software')} sx={buttonStyles}>Using the Software</Button>
                                <Button variant='contained' className='subtext' onClick={() => handleSectionClick('Troubleshoot')} sx={buttonStyles}>Troubleshooting and Support</Button>   
                            </div>
                            <Button variant='contained' onClick={() => onBackButtonClick()} sx={returnButtonStyles}>
                                Back to Dashboard
                            </Button> 
                        </div>
                </Paper>
            )}

            {selectedSection === 'Introduction' && (
            <Introduction onBackButtonClick={handleBackButtonClick} />
            )}
            {selectedSection === 'Overview' && (
            <Overview onBackButtonClick={handleBackButtonClick} />
            )}
            {selectedSection === 'Getting Started' && (
            <GettingStarted onBackButtonClick={handleBackButtonClick} />
            )}
            {selectedSection === 'Using the Software' && (
            <UsingTheSoftware onBackButtonClick={handleBackButtonClick} />
            )}
            {selectedSection === 'Troubleshoot' && (
            <Troubleshooting onBackButtonClick={handleBackButtonClick} />
            )}

        </div>
    );
}

function Flagging( {onBackButtonClick, searchTerm} ) {  
    return (
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className='text'>Flags</h2>
            </header>
            <div className='info-dump'>

                <HighlightedText text="The Sentinel application utilises a Machine Learning Model to detect certain patterns and behaviours as 'cheating'. This involves running a script that analyses frames from the real-time video provided by the webcam each interval; for this system, is every ~5ms." searchTerm={searchTerm}/>

                <HighlightedText text="In the event a 'cheating' behavious is detected by the system, the admin overseeing the exam session is notified of the event, being provided a short recorded clip of the detecetd behaviour." searchTerm={searchTerm}/>                
                <img src={UM31} className='image'></img>
                <h5 className='figure-heading'><HighlightedText text="Figure 1: Student misconduct requiring approval, admin perspective." searchTerm={searchTerm}/></h5>

                <HighlightedText text="If the admin verifies the flagged behaviour is a valid cheating instance, the student is notified and promptly warned of their misconduct." searchTerm={searchTerm}/>
                <img src={UM21} className='image'></img>
                <h5 className='figure-heading'><HighlightedText text="Figure 2: Student misconduct flag, student perspective." searchTerm={searchTerm}/></h5>

                <HighlightedText text="The Machine Learning model analyses frames from the webcam to detect cheating through two methodologies, objection recognition analysis and facial landmark analysis." searchTerm={searchTerm}/>

                <h5 className='terms'>Object Cheating Behaviours</h5>
                <HighlightedText text="The script interprets all objects in the camera feed, and raises a flag if any banned items are detected. These include:" searchTerm={searchTerm}/>
                
                <ul>
                    <li><HighlightedText text="Mobile phone, laptop, keyboard, and mouse." searchTerm={searchTerm}/></li>
                </ul>
                <HighlightedText text="This aligns with the criteria, whereby a student should only have a pen, paper, eraser and calculator at any given time." searchTerm={searchTerm}/>

                <img src={MobileDetection} className='image'></img>
                <h5 className='figure-heading'><HighlightedText text="Figure 3: Example mobile phone detection frame." searchTerm={searchTerm}/></h5>

                <HighlightedText text="This model also raises a flag if more than one person is present in the frame; only the student being examinated should be present at all times." searchTerm={searchTerm}/>

                <h5 className='terms'>Facial Landmark Behaviours</h5>
                <HighlightedText text="The script identifies facial landmarks and draws a mesh over the student's face, comparing these in real-time to determine if two key events occur:" searchTerm={searchTerm}/>
                <ul>
                    <li><HighlightedText text="If the student turns their head away from the screen." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="If the student looks away from the designated exam screen." searchTerm={searchTerm}/></li>
                </ul>

                <HighlightedText text="These behaviours have been identified as key indicators of a student engaging in suspicious activities, as this suggest the student is viewing content through an external source." searchTerm={searchTerm}/>

                <img src={GazeTracking} className='image'></img>
                <h5 className='figure-heading'><HighlightedText text="Figure 4: Example facial landmark analysis for gaze detection." searchTerm={searchTerm}/></h5>
                
            </div>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={returnButtonStyles}>
                Back to Dashboard
            </Button>
        </Paper>
    );
}

function TermsAndConditions( {onBackButtonClick, searchTerm} ) {

    return (
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className='text'>Terms and Conditions</h2>
            </header>
            <div className='info-dump'>

                <HighlightedText text="These terms and conditions (the 'Agreement') govern the use of an AI Online Exam Proctoring Tool (the 'Service') provided by Sentinel (the 'Company') to the user (the 'User'). By using this service, the user agrees to abide by the terms and conditions outlined below:" searchTerm={searchTerm}/>

                <h5 className='terms'>Acceptance of Terms</h5>
                <HighlightedText text="By using this service, the User acknowledges and agrees to these Terms and Conditions. If the User does not agree to these terms, they should refrain from using the Service." searchTerm={searchTerm}/>
                
                <h5 className='terms'>User Eligibility</h5>
                <HighlightedText text="This Service is intended for use by educational institutions, examiners and students. To use the service, users must be at least 18 years of age or have the consent of a parent or guardian to use the Service." searchTerm={searchTerm}/>

                <h5 className='terms'>Registration and Account Security</h5>
                <HighlightedText text="The User is responsible for maintaining the confidentiality of their login credentials and account information. The User is also responsible for any activities conducted through their account. If the User suspects any unauthorised access to their account, they must notify their provider immediately." searchTerm={searchTerm}/>

                <h5 className='terms'>Privacy and Data Usage</h5>
                <HighlightedText text="The Provider may collect, use and process personal data and information provided by the User in accordance with the Privacy Policy, which can be found on the provider's website." searchTerm={searchTerm}/>

                <h5 className='terms'>Proctoring and Monitoring</h5>
                <HighlightedText text="The Service uses AI and other technologies to proctor and monitor online exams. This includes but is not limited to webcam, microphone and screen mirroring. The User's actions, such as eye movements and background noise, may be recorded during an examination." searchTerm={searchTerm}/>

                <h5 className='terms'>Code of Conduct</h5>
                
                <HighlightedText text="The User agrees to adhere to the following code of conduct while using the Service:" searchTerm={searchTerm}/><p></p>
                <ul>
                    <li><HighlightedText text="The User will not attempt to cheat or engage in any form of academic dishonesty." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="The User will not impersonate or provide false information." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="The User will not disrupt or interfere with the operation of the Service." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="The User will not attempt to reverse engineer, hack, or modify the Service." searchTerm={searchTerm}/></li>
                    <li><HighlightedText text="The User will not share or distribute exam content without permission." searchTerm={searchTerm}/></li>
                </ul>

                <h5 className='terms'>Exam Results and Reporting</h5>
                <HighlightedText text="The Provider will share the results of proctored examinations and corresponding flag logs with authorised individuals or organizations, such as instructors, educational institutions, or third-party exam providers, as specified by the User or required by law." searchTerm={searchTerm}/>

                <h5 className='terms'>Termination</h5>
                <HighlightedText text="The Provider reserves the right to suspend or terminate a User's access to the Service at any time, for any reason, without notice. In case of termination, the User will not be entitled to a refund of any fees paid." searchTerm={searchTerm}/>

                <h5 className='terms'>Contact Information</h5>
                <HighlightedText text="For any questions or concerns regarding these Terms and Conditions or the Service, the User may contact the Provider at service@Sentinel.com." searchTerm={searchTerm}/>
                
                <Button variant='contained' onClick={() => onBackButtonClick()} sx={returnButtonStyles}>
                    Back to Dashboard
                </Button>
            </div>
        </Paper>
    );
}

export {UserManual, Flagging, TermsAndConditions};