import React, { useEffect } from "react";
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
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';

//TO-DO:
//Time input validation (endTime !> startTime) --> ctrl+f "handleClickSave" for expected implementation location
//Date selection validation (cannot select a date in the past) --> ctrl+f "handleClickSave" for expected implementation location
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
  const [examDate, setExamDate] = React.useState(dayjs("2022-04-17"));
  const [ammendedExamDate, setAmmendedExamDate] = React.useState("");

  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
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

  const handleCloseSnackbar = () => {
    setSnackbarState(false);
  };

  const handleCloseDialogue = () => {
    setOpen(false);
  };

  const handleCreateSession = () => {
    //current placeholder for this method only closes the dialogue
    //will replace with .post request when DB connections are complete
    setOpen(false);
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
    var trimmedString = examDate.toString();
    trimmedString = trimmedString.slice(0, 13);
    setAmmendedExamDate(trimmedString);
  }, [examDate]);

  useEffect(() => {
    var trimmedString = startTime.toString();
    trimmedString = trimmedString.slice(17);
    setAmmendedStartTime(trimmedString);
  }, [startTime]);

  useEffect(() => {
    var trimmedString = endTime.toString();
    trimmedString = trimmedString.slice(17);
    setAmmendedEndTime(trimmedString);
  }, [endTime]);

  const handleClickSave = () => {
    if (examName == "") {
      setSnackbarMessage("Error: No Exam Name Provided");
      setSnackbarState(true);
    } else if (scheduledClass == 0) {
      setSnackbarMessage("Error: No Class Provided");
      setSnackbarState(true);
    } else if (startTime == 0) {                                
      setSnackbarMessage("Error: No Start Time Provided");
      setSnackbarState(true);
    } else if (endTime == 0) {
      setSnackbarMessage("Error: No End Time Provided");
      setSnackbarState(true);
    } else {
      //validate that date selected is not in the past
      //validate that endTime > startTime (cannot end an exam before it starts)
      //
      setOpen("true");
    }
  };

  return (
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
                <Grid item xs={1} >
                  <Box sx={{ pl: 15, pr: 1, pt: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
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
              <Box sx={{ pl: 10, pr: 10 }}>
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
                    {/* Classes are hard-coded here */}
                    <MenuItem value={"Class 1"}>Class 1</MenuItem> 
                    <MenuItem value={"Class 2"}>Class 2</MenuItem>
                    <MenuItem value={"Class 3"}>Class 3</MenuItem>
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
              </Box>
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
              Class: {scheduledClass} <br />
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
        <Snackbar
          open={snackbarState}
        >
          <Alert severity="error" onClose={handleCloseSnackbar} >{snackbarMessage}</Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default CreateSession;
