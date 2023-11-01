import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import '../css/AdminPages.css';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Loader from '../components/Loader';
import { formatISOTime } from '../components/Clock';
import {Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions} from '@mui/material';
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ManageClasses() {
  const [classes, setClasses] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [exam, setExam] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const classesResponse = (await axios.get(process.env.REACT_APP_SERVER_URL + "/class/get")).data;
      const studentsResponse = (await axios.get(process.env.REACT_APP_SERVER_URL + '/student/get')).data;
      setClasses(classesResponse);
      setStudents(studentsResponse);
      setSelectedClass(classesResponse[0]);
      const examResponse = await axios.get(process.env.REACT_APP_SERVER_URL +'/exam/getExamDetails/' + classesResponse[0].examId);
      setExam(examResponse.data);
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
    fetchDetails();
  }, [isAdmin, navigate]);

  async function onCardSelect(props) {
    console.log({props})
    setSelectedClass(props);
    try {
      await axios.get(process.env.REACT_APP_SERVER_URL +'/exam/getExamDetails/' + props.examId)
        .then((response) => setExam(response.data))
    } catch (error) {
      console.error(error);
    }
  }

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

  const handleDeleteClass = () => {
    deleteClass();
    handleCloseDialogue();
  };

  const handleClick = () => {
    setOpen(true);
  }
  const deleteClass = async() =>
  {
    
    try {
      const response = await axios.get("http://localhost:4000" + '/class/deleteClassDetails/' + selectedClass.subjectId)
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
				<Card title={"Manage Classes"} button={{text: '+ Add Class', route: '/createClass'}}>
					<div className='scheduleContainer'>
						<div style={{ width: '30%', overflowY: 'auto'}}>
              {classes && <div style={{ paddingTop: 20 }}>
              </div>}
              {classes && classes.map((c) => (
              <div className='scheduleSmallCard' 
                onClick={() => { onCardSelect(c); setExam(null); }}
                style={{ backgroundColor: (selectedClass && selectedClass.className === c.className) ? '#c94831' : '',
                color: (selectedClass && selectedClass.className === c.className) ? 'white' : '' }}>
                <div style={{ fontWeight: 'bold', padding: 10 }}>
                  {c.subjectId}: {c.className}
                </div>
                <div style={{ padding: 10 }}>
                  {c.students.length} students
                </div>
                {c.examId && <div style={{ padding: 10 }}>
                  1 scheduled exam
                </div>}
              </div>))}
						</div>
						{!(selectedClass && exam) ? <div className='scheduleLargeCard' style={{padding: 20, fontFamily: "Montserrat, sans-serif", fontSize: '1.1rem' }}>
              Loading...</div> 
              : <div className='scheduleLargeCard'>
              <div style={{ fontWeight: 'bold', fontSize: '1.7rem'}}>
                {selectedClass.subjectId}: {selectedClass.className}
              </div>
              <div style={{ paddingTop: 40, fontSize: '1.2rem' }}>
                <div style={{ paddingBottom: 10, fontSize: '1.3rem', fontWeight: 'bold' }}>
                  There are {selectedClass.students.length > 1 ? selectedClass.students.length + ' students ': ' 1 student '}in this class.
                </div>
                {(students.filter(s => (selectedClass.students.map(stu => stu.studentId)).includes(s.studentId)))
                  .map((student, i) => {
                    return <div>{i+1}. {student.name.firstName} {student.name.lastName} (
                    <a href={`/student/${student.studentId}`} style={{ color: 'blue' }}>
                      {student.studentId}
                    </a>),
                      seat {(selectedClass.students.find(x => x.studentId === student.studentId)).seatNo}</div>})}
              </div>
              <div style={{ paddingTop: 20, fontSize: '1.2rem' }}>
                <div style={{ paddingBottom: 10, fontSize: '1.3rem', fontWeight: 'bold' }}>
                  Exam #{selectedClass.examId}
                </div>
                {exam.examName}
                <div>{(new Date(exam.startTime).toDateString())}</div>
                <div>Starts at {formatISOTime(exam.startTime)}</div>
                <div>Ends at {formatISOTime(exam.endTime)}</div>
              </div>
              <div className='scheduleButtonContainer' style={{paddingTop: 20, paddingBottom: 20}}>
              <Button component={Link} to={`/editclass/${selectedClass.subjectId}`} sx={buttonStyles} className="scheduleButton" variant="contained">
                  <div className="scheduleIcons">
                    <ModeEditOutlinedIcon />
                  </div>
                  <div className='scheduleButtonText'>
                    Edit
                  </div>
                </Button>
                <Button component={Link} sx={buttonStyles}className="scheduleButton" variant="contained" onClick={handleClick}>
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
			</div>
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
              Are you sure you want to delete class: {selectedClass.className}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogue}>Cancel</Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleDeleteClass}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
		</div>
  );
}

export default ManageClasses;