import React from 'react';
import '../css/HelpCentre.css'
import { Button } from '@mui/material';

function UserManual( {onBackButtonClick} ) {
    return (
        <div className='content-container'>
            <h2 className="text">User Manual</h2>
            <p className='subtext'>This manual is very insightful</p>
            <Button variant='contained' onClick={() => onBackButtonClick()}>
                Back to Dashboard
            </Button>
        </div>
    );
}

function FaceAuthenticationTroubleshoot( {onBackButtonClick} ) {
    return (
        <div className='content-container'>
            <h2 className="text">Face Authentication Guide</h2>
            <p className='subtext'>Oh no i need to use my actual sign in dang</p>
            <Button variant='contained' onClick={() => onBackButtonClick()}>
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
            <Button variant='contained' onClick={() => onBackButtonClick()}>
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
            <Button variant='contained' onClick={() => onBackButtonClick()}>
                Back to Dashboard
            </Button>
        </div>
    );
}

export {UserManual, FaceAuthenticationTroubleshoot, ComputerSpecs, TermsAndConditions};