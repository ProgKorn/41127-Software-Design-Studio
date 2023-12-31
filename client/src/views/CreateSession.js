import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import "../css/AdminFonts.css";
import { Button, Grid } from "@mui/material";
import Card from "../components/Card";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Loader from '../components/Loader';
import {formatISOTime, formatISODate} from "../components/Clock";

//TO-DO:
//Cannot assign multiple exams to a class --> ctrl+r "classValidation" for more info
//Add functionality to handleCreateSession() which will send a .post() request to the DB [classes are hard-coded rn]
//General style cleanup

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const height = 300;
const labelOffset = -6;

function CreateSession() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const offset = tomorrow.getTimezoneOffset();
  const offsetDate = new Date(tomorrow.getTime() - offset * 60 * 1000);
  const reformattedDate = offsetDate.toISOString().split("T")[0];

  const [isAdmin, setIsAdmin] = useState(true);
  const [classes, setClasses] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(true);
        fetchClasses();
      } else {
        setIsAdmin(false);
        navigate("/noaccess");
      }
    }
  }, [isAdmin, navigate]);

  const [examDate, setExamDate] = React.useState(dayjs(tomorrow));
  const [ammendedExamDate, setAmmendedExamDate] = React.useState("");

  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [ammendedStartTime, setAmmendedStartTime] = React.useState(0);
  const [ammendedEndTime, setAmmendedEndTime] = React.useState(0);

  const [scheduledClass, setScheduledClass] = React.useState(0);
  const [examName, setExamName] = React.useState("");
  const [examDescription, setExamDescription] = React.useState(
    "No Description Provided"
  );

  const [open, setOpen] = React.useState(false);

  const [snackbarMessage, setSnackbarMessage] = React.useState(
    "Error encountered while saving form"
  );
  const [snackbarState, setSnackbarState] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");

  const handleCloseSnackbar = () => {
    setSnackbarState(false);
  };

  const handleCloseDialogue = () => {
    setOpen(false);
  };

  const handleCreateSession = () => {
    //current placeholder for this method only closes the dialogue
    //will replace with .post request when DB connections are complete
    addExam();
  };

  const handleChangeClass = (event) => {
    setScheduledClass(event.target.value);
  };

  const handleChangeExamName = (event) => {
    setExamName(event.target.value);
  };

  const handleChangeExamDescription = (event) => {
    setExamDescription(event.target.value);
  };

  useEffect(() => {
    var trimmedString = formatISODate(examDate).toString();
    trimmedString = trimmedString.slice(0, 15);
    setAmmendedExamDate(trimmedString);
  }, [examDate]);
  
  useEffect(() => {
    var trimmedString = formatISOTime(startTime).toString();
    setAmmendedStartTime(trimmedString);
    console.log("start time is " + startTime + "or " + trimmedString)

    if (startTime > endTime && startTime !== "") {
      setSnackbarSeverity("warning");
      setSnackbarMessage(
        "Warning: Exam end time occurs before start time. Please correct before proceeding."
      );
      setSnackbarState(true);
    }
  }, [startTime]);

  useEffect(() => {
    var trimmedString = formatISOTime(endTime).toString();
    setAmmendedEndTime(trimmedString);
    console.log("end time is " + endTime + "or " + trimmedString)

    if (startTime > endTime && endTime !== "") {
      setSnackbarSeverity("warning");
      setSnackbarMessage(
        "Warning: Exam end time occurs before start time. Please correct before proceeding."
      );
      setSnackbarState(true);
    }
  }, [endTime]);

  const handleClickSave = () => {
    if (examName == "") {
      setSnackbarMessage("Error: No Exam Name Provided");
      setSnackbarSeverity("error");
      setSnackbarState(true);
    } else if (startTime == 0) {
      setSnackbarMessage("Error: No Start Time Provided");
      setSnackbarSeverity("error");
      setSnackbarState(true);
    } else if (endTime == 0) {
      setSnackbarMessage("Error: No End Time Provided");
      setSnackbarSeverity("error");
      setSnackbarState(true);
    } else if (startTime > endTime) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error: Exam end time occurs before start time.");
      setSnackbarState(true);
    } else {
      setOpen("true");
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/class/get"
      );
      setClasses(response.data.map((doc) => doc.className));
      setLoading(false);
    } catch (error) {
      console.log("The error" + error);
    }
  };

  const addExam = async() => {
    var examDateVariable = new Date(examDate);
    var startTimeDate = new Date(startTime);
    var endTimeDate = new Date(endTime);
    var utcStartDate = new Date( examDateVariable.getFullYear(),examDateVariable.getMonth(), examDateVariable.getDate(), startTimeDate.getHours(), startTimeDate.getMinutes())
    var utcEndDate = new Date( examDateVariable.getFullYear(),examDateVariable.getMonth(), examDateVariable.getDate(), endTimeDate.getHours(), endTimeDate.getMinutes())

    const requestBody = { 
      examName: examName,
      startTime: utcStartDate.toISOString(), 
      endTime: utcEndDate.toISOString(), 
      details: examDescription,
      className: classes[scheduledClass],
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/exam/addExam",
        requestBody
      );
      console.log("POST request response:", response.data);
      setOpen(false);
      navigate("/admin");
    } catch (error) {
      console.log("The error" + error);
    }
  };

  return isLoading ? (
    <Loader loading={true} />
  ) : (
    <div>
      <AdminHeader />
      <div className="createSession">
        <Card title={"Schedule an Exam"} sx={{ p: 10 }}>
          <Grid container columns={4}>
            <Grid item xs={2}>
              <Box sx={{ pl: 10, pr: 10, pt: 3 }}>
                <h1>Exam Date and Duration</h1>
              </Box>

              <Grid container columns={2} sx={{ pt: 7 }}>
                <Grid item xs={1}>
                  <Box sx={{ pl: 8, pr: 1, pt: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        disablePast={true}
                        disableHighlightToday={true}
                        minWidth="350"
                        minDate={dayjs(reformattedDate)}
                        orientation="landscape"
                        value={examDate}
                        onChange={(newValue) => setExamDate(newValue)}
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box sx={{ p: 5, pl: 0 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box sx={{ pt: 7 }}>
                        <TimePicker
                          fullWidth
                          label="Start Time"
                          onChange={setStartTime}
                        />
                      </Box>
                      <Box sx={{ pt: 3 }}>
                        <TimePicker
                          fullWidth
                          label="End Time"
                          onChange={setEndTime}
                        />
                      </Box>
                    </LocalizationProvider>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={2} sx={{ p: 3 }}>
                <h1>Exam Details</h1>
                <FormControl fullWidth sx={{ minWidth: 120 }}>
                  <InputLabel required>Class</InputLabel>
                  <Select
                    labelId=""
                    id="demo-simple-select-helper"
                    value={scheduledClass}
                    label="Class"
                    onChange={handleChangeClass}
                  >
                    {classes.map((className, index) => {
                      return <MenuItem value={index}>{className}</MenuItem>;
                    })}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ pt: 5, minWidth: 120 }}>
                  <TextField
                    required
                    fullWidth
                    label="Exam Name"
                    id="fullWidth"
                    onChange={handleChangeExamName}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ pt: 5 }}>
                  <TextField
                    fullWidth
                    label="Description"
                    id="fullWidth"
                    style={{ height }}
                    InputLabelProps={{
                      style: {
                        height,
                        ...{ top: `${labelOffset}px` },
                      },
                    }}
                    inputProps={{
                      style: {
                        height,
                        padding: "0 14px",
                      },
                    }}
                    onChange={handleChangeExamDescription}
                  />
                </FormControl>

                <FormControl sx={{ pt: 5 }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ p: 2 }}
                    onClick={handleClickSave}
                  >
                    Schedule Exam
                  </Button>
                </FormControl>
            </Grid>
          </Grid>
        </Card>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialogue}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Confirm Exam Details"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              maxWidth={"lg"}
            >
              Name: {examName} <br />
              Start Time: {ammendedStartTime} <br />
              End Time: {ammendedEndTime} <br />
              Date: {ammendedExamDate} <br />
              Class: {classes[scheduledClass]} <br />
              Description: {examDescription}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogue}>Cancel</Button>
            <Button
              color="success"
              variant="contained"
              onClick={handleCreateSession}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={snackbarState} autoHideDuration={3000}>
          <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default CreateSession;
