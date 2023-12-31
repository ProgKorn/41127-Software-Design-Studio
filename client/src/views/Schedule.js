import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import '../css/AdminPages.css';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Loader from '../components/Loader';
import { formatISODate, formatISOTime } from '../components/Clock';
import {Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions} from '@mui/material';
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Schedule() {
  const [exams, setExams] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/exam/getExamDetails");
      const orderedExams = response.data.sort((a,b)=>{return new Date(a.startTime) - new Date(b.startTime)})
      setExams(orderedExams);
      setSelectedExam(orderedExams[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        navigate('/noaccess'); 
	    }
	  }
    fetchExamDetails();
  }, [isAdmin, navigate]);

  const buttonStyles = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: 'Capitalize',
    color: 'white',
    backgroundColor: "#292E64",
    '&:hover': {
      backgroundColor: '#a03421'
    },
  }

  const handleCloseDialogue = () => {
    setOpen(false);
  };

  const handleDeleteSession = () => {
    deleteExam();
    handleCloseDialogue();
  };

  const handleClick = () => {
    setOpen(true);
  }
  const deleteExam = async() =>
  {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/exam/deleteExamDetails/' + selectedExam.examId)
      console.log("Delete Response received", response);
      window.location.reload();

    } catch (error) {
      console.log("Error", error)
    } 
  }
  return loading ? <Loader loading={loading} /> : (
		<div className="Schedule">
			<AdminHeader/>
			<div className='pageCardPadding' style={{paddingTop: 20}}>
				<Card title={"Upcoming Examinations"}>
					<div className='scheduleContainer'>
						<div style={{ width: '30%', overflowY: 'auto'}}>
              {exams && <div style={{ paddingTop: 20 }}>
              </div>}
              {exams && exams.map((exam) => (
              <div className='scheduleSmallCard' 
                onClick={() => setSelectedExam(exam)}
                style={{ backgroundColor: (selectedExam && selectedExam.examId === exam.examId) ? '#c94831' : '',
                color: (selectedExam && selectedExam.examId === exam.examId) ? 'white' : '' }}>
                <div style={{ fontWeight: 'bold', padding: 10 }}>
                  {exam.examName}
                </div>
                <div style={{ padding: 10 }}>
                  Exam ID: {exam.examId}
                </div>
                <div style={{ padding: 10 }}>
                  {(new Date(exam.startTime).toDateString())}
                </div>
                <div style={{ padding: 10, paddingTop: 0 }}>
                  {(formatISOTime(new Date(exam.startTime)))} - {formatISOTime((new Date(exam.endTime)))}
                </div>
              </div>))}
						</div>
						{selectedExam && <div className='scheduleLargeCard'>
              <div style={{ fontWeight: 'bold', fontSize: '1.7rem'}}>
                {selectedExam.examName}
              </div>
              <div style={{ paddingTop: 40, fontSize: '1.2rem' }}>
                {(formatISODate(new Date(selectedExam.startTime)))} - {formatISODate((new Date(selectedExam.endTime)))}
              </div>
              <div style={{ paddingTop: 20, fontSize: '1.2rem' }}>
                Exam ID: {selectedExam.examId}
              </div>
              <div style={{ paddingTop: 20 }}>
              <a href={`/exam/${selectedExam.examId}`} style={{ color: 'blue',  fontSize: '1.2rem' }}>
                Show Exam Details</a></div>
              <div className='scheduleButtonContainer'>
                <Button component={Link} to="/launchExam" sx={buttonStyles} className="scheduleButton" variant="contained">
                  <div className="scheduleIcons">
                    <LaunchRoundedIcon />
                  </div>
                  <div className='scheduleButtonText'>
                    Launch
                  </div>
                </Button>
                <Button component={Link} to="/manageClasses" sx={buttonStyles}className="scheduleButton" variant="contained">
                  <div className="scheduleIcons">
                    <GroupsOutlinedIcon />
                  </div>
                  <div className='scheduleButtonText'>
                    View Class
                  </div>
              </Button>
              <Button component={Link} to={`/editexam/${selectedExam.examId}`} sx={buttonStyles} className="scheduleButton" variant="contained">
                  <div className="scheduleIcons">
                    <ModeEditOutlinedIcon />
                  </div>
                  <div className='scheduleButtonText'>
                    Edit
                  </div>
                </Button>
                <Button sx={buttonStyles}className="scheduleButton" variant="contained" onClick={handleClick}>
                  <div className="scheduleIcons">
                    <DeleteOutlineOutlinedIcon />
                  </div>
                  <div className='scheduleButtonText'>
                    Delete
                  </div>
              </Button>
              </div>
						</div>}
					</div>
				</Card>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialogue}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle> Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              maxWidth={"lg"}
            >
              Are you sure you want to delete exam: {selectedExam.examName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogue}>Cancel</Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleDeleteSession}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
			</div>
		</div>
  );
}

export default Schedule;