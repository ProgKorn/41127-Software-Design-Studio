import React, { useState } from 'react';
import '../css/HelpCentre.css';
import { Button } from '@mui/material';
import {Introduction, Overview, GettingStarted, UsingTheSoftware, Troubleshooting} from '../components/UserManual';

const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    backgroundColor: "#292E64",
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
}

const returnButtonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    backgroundColor: "#ef233c",
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    '&.MuiButton-root:hover':{bgcolor: '#8d99ae'}
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
                <div>
                    <header className='header'>
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
                </div>
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
        <div className='content-container'>
            <h2 className="text">Face Authentication Guide</h2>
            <p className='subtext'>Oh no i need to use my actual sign in dang</p>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to Dashboard
            </Button>
        </div>
    );
}

function ComputerSpecs( {onBackButtonClick} ) {
    return (
        <div className='content-container'>
            <h2 className="text">Flags</h2>
            <p className='subtext'>Prob outline what are the key things being flagged, also define the circumstance under which an exam is terminated + the steps that follow</p>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to Dashboard
            </Button>
        </div>
    );
}

function TermsAndConditions( {onBackButtonClick} ) {
    return (
        <div className='content-container'>
            <h2 className="text">Terms and Conditions</h2>
            <p className='subtext'>Legal jargon here</p>
            <Button variant='contained' onClick={() => onBackButtonClick()} sx={buttonStyles}>
                Back to Dashboard
            </Button>
        </div>
    );
}

export {UserManual, FaceAuthenticationTroubleshoot, ComputerSpecs, TermsAndConditions};