import React, { startTransition, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import '../css/AdminPages.css';
import jwt_decode from 'jwt-decode';
import Loader from '../components/Loader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Box, Grid } from '@mui/material';
import Card from '../components/Card';
import axios from 'axios';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function EditExam()
{

    const {examId} = useParams();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);
    const [examName, setExamName] = useState("");
    const [examDetails, setExamDetails] = useState("");
    const [examDate, setExamDate] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [snackbarMessage, setSnackbarMessage] = useState(
        "Error encountered while saving form"
      );
     const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("");
    const [startTime, setStartTime] = useState(" ");
    const [endTime, setEndTime] = useState(" ");

    const today = new Date(); 
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const offset = tomorrow.getTimezoneOffset()
    const offsetDate = new Date(tomorrow.getTime() - (offset*60*1000))
    const reformattedDate = offsetDate.toISOString().split('T')[0];
    

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
          fetchExam();
      }, [isAdmin, navigate]);

      const fetchExam = async() => 
      {
        try {
             const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/exam/getExamDetails/' + examId)
             setExamName(response.data.examName);
             setExamDetails(response.data.details);
             setStartTime(response.data.startTime);
             setEndTime(response.data.endTime);
             setExamDate(dayjs(response.data.startTime));
             setLoading(false);

        } catch(error) {
            console.log(error);

        }
      };

      const handleClickSave = () =>
      {
        if((!examName.trim().length))
        {
            setSnackbarMessage("Error: No Exam Name Provided");
            setSnackbarSeverity("error");
            setSnackbarState(true);
        } else if((!examDetails.trim().length))
        {
            setSnackbarMessage("Error: No Exam Details Provided");
            setSnackbarSeverity("error");
            setSnackbarState(true);
        } else if (startTime > endTime){
            setSnackbarSeverity("error");
            setSnackbarMessage("Error: Exam end time occurs before start time.");
            setSnackbarState(true);
        }else {
            setOpen(true);
        }
        

      };

      const handleCloseSnackbar = () => {
        setSnackbarState(false);
      };

      const handleCloseDialogue = () => {
        setOpen(false);
      };

      const handleEditSession = () => {
        updateExam();
        handleCloseDialogue();
      };

      const updateExam = async() =>
      {
        var examDateVariable = new Date(examDate);
        var startTimeDate = new Date(startTime);
        var endTimeDate = new Date(endTime);
        var utcStartDate = new Date( examDateVariable.getFullYear(),examDateVariable.getMonth(), examDateVariable.getDate(), startTimeDate.getHours(), startTimeDate.getMinutes())
        var utcEndDate = new Date( examDateVariable.getFullYear(),examDateVariable.getMonth(), examDateVariable.getDate(), endTimeDate.getHours(), endTimeDate.getMinutes())

         const data = 
          {
            "examId"  : examId,
            "examName": examName,
            "startTime": utcStartDate, 
            "endTime": utcEndDate,
            "details" : examDetails
        }
        try {
          const response = await axios.post("http://localhost:4000" + '/exam/editExamDetails', data)
          console.log("POST Response received", response);

        } catch (error) {
          console.log("Error", error)
        } 
      }
    
      return loading ? <Loader loading={(loading)} /> 
      :(<div className='App'>
          <AdminHeader />
          <Card title={"Edit Exam"} sx={{ p: 10 }}>
            <Box sx={{ pl: 10, pr: 10, pb: 2}}>
            <FormControl fullWidth sx={{ pt: 2, minWidth: 120 }}>
                <FormLabel 
                sx = {{
                    textAlign: "left",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight:'bold'
                }}>
                    Exam Name
                </FormLabel>
                <TextField
                    value = {examName}
                    onChange={event => setExamName(event.target.value)}
                />
            </FormControl>
            <FormControl fullWidth sx={{ pt: 2, minWidth: 120 }}>
                <FormLabel 
                sx = {{
                    textAlign: "left",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight:'bold'
                }}>
                    Exam Details
                </FormLabel>
                <TextField
                    value = {examDetails}
                    onChange={event => setExamDetails(event.target.value)}
                />
            </FormControl>
             <Grid container columns={2}>
                <Grid item xs={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        disablePast={true}
                        orientation="landscape"
                        value={examDate}
                        onChange={(newValue) => setExamDate(newValue)}
                      />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={1}>
                  <Box sx={{ p: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box sx={{ pt: 7 }}>
                        <TimePicker
                          value= {dayjs(startTime)}
                          fullWidth
                          label="Start Time"
                          onChange={setStartTime}
                        />
                      </Box>
                      <Box sx={{ pt: 2 }}>
                        <TimePicker
                          value={dayjs(endTime)}
                          fullWidth
                          label="End Time"
                          onChange={setEndTime}
                        />
                      </Box>
                    </LocalizationProvider>
                  </Box>
                </Grid>
              </Grid>
              <FormControl>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ p: 2 }}
                    onClick={handleClickSave}
                >
                    Edit Exam
                </Button>
             </FormControl>
            </Box>
          </Card>
          <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialogue}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              maxWidth={"lg"}
            >
              Confirm Changes to Exam
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogue}>Cancel</Button>
            <Button
              color="success"
              variant="contained"
              onClick={handleEditSession}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
          <Snackbar open={snackbarState}>
          <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        </div>

    );

}

export default EditExam;
