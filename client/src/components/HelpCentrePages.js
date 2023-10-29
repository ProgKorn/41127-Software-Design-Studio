import React, { useState } from 'react';
import '../css/HelpCentre.css';
import { Button, Paper } from '@mui/material';
import {Introduction, Overview, GettingStarted, UsingTheSoftware, Troubleshooting} from '../components/UserManual';

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
                            <div className='return'>
                                <Button variant='contained' onClick={() => onBackButtonClick()} sx={returnButtonStyles}>
                                    Back to Dashboard
                                </Button>                        
                            </div>
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

function FaceAuthenticationTroubleshoot( {onBackButtonClick} ) {
    return (
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className='text'>Face Authentication Guide</h2>
            </header>
            <div className='info-dump'>
                <p className='subtext'>Oh no i need to use my actual sign in dang</p>
                <Button variant='contained' onClick={() => onBackButtonClick()} sx={returnButtonStyles}>
                    Back to Dashboard
                </Button>
            </div>
        </Paper>
    );
}

function Flagging( {onBackButtonClick} ) {
    return (
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className='text'>Flags</h2>
            </header>
            <div className='info-dump'>
                <p className='subtext'>Prob outline what are the key things being flagged, also define the circumstance under which an exam is terminated + the steps that follow</p>
                <Button variant='contained' onClick={() => onBackButtonClick()} sx={returnButtonStyles}>
                    Back to Dashboard
                </Button>
            </div>
        </Paper>
    );
}

function TermsAndConditions( {onBackButtonClick} ) {
    return (
        <Paper elevation={8} className="paper-container">
            <header className='help-centre-header'>
                <h2 className='text'>Terms and Conditions</h2>
            </header>
            <div className='info-dump'>

                <p className='subtext'>These terms and conditions (the "Agreement") govern the use of an AI Online Exam Proctoring Tool (the "Service") provided by Sentinel (the "Company") to the user (the "User"). By using this service, the user agrees to abide by the terms and conditions outlined below:</p>

                <h5 className='terms'>Acceptance of Terms</h5>
                <p>By using this service, the User acknowledges and agrees to these Terms and Conditions. If the User does not agree to these terms, they should refrain from using the Service.</p>
                
                <h5 className='terms'>User Eligibility</h5>
                <p>This Service is intended for use by educational institutions, examiners and students. To use the service, users must be at least 18 years of age or have the consent of a parent or guardian to use the Service.</p>

                <h5 className='terms'>Registration and Account Security</h5>
                <p>The User is responsible for maintaining the confidentiality of their login credentials and account information. The User is also responsible for any activities conducted through their account. If the User suspects any unauthorised access to their account, they must notify their provider immediately.</p>

                <h5 className='terms'>Privacy and Data Usage</h5>
                <p>The Provider may collect, use and process personal data and information provided by the User in accordance with the Privacy Policy, which can be found on the provider's website.</p>

                <h5 className='terms'>Proctoring and Monitoring</h5>
                <p>The Service uses AI and other technologies to proctor and monitor online exams. This includes but is not limited to webcam, microphone and screen mirroring. The User's actions, such as eye movements and background noise, may be recorded during an examination.</p>

                <h5 className='terms'>Code of Conduct</h5>
                <p>The User agrees to adhere to the following code of conduct while using the Service:</p>
                <ul>
                    <li>The User will not attempt to cheat or engage in any form of academic dishonesty.</li>
                    <li>The User will not impersonate or provide false information.</li>
                    <li>The User will not disrupt or interfere with the operation of the Service.</li>
                    <li>The User will not attempt to reverse engineer, hack, or modify the Service.</li>
                    <li>The User will not share or distribute exam content without permission.</li>
                </ul>

                <h5 className='terms'>Exam Results and Reporting</h5>
                <p>The Provider will share the results of proctored examinations and corresponding flag logs with authorised individuals or organizations, such as instructors, educational institutions, or third-party exam providers, as specified by the User or required by law.</p>

                <h5 className='terms'>Termination</h5>
                <p>The Provider reserves the right to suspend or terminate a User's access to the Service at any time, for any reason, without notice. In case of termination, the User will not be entitled to a refund of any fees paid.</p>

                <h5 className='terms'>Contact Information</h5>
                <p>For any questions or concerns regarding these Terms and Conditions or the Service, the User may contact the Provider at service@Sentinel.com.</p>
                
                <Button variant='contained' onClick={() => onBackButtonClick()} sx={returnButtonStyles}>
                    Back to Dashboard
                </Button>
            </div>
        </Paper>
    );
}

export {UserManual, FaceAuthenticationTroubleshoot, Flagging, TermsAndConditions};