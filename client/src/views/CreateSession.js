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
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const height = 300;
const labelOffset = -6;

function CreateSession() {
  const [examDate, setExamDate] = React.useState(dayjs("2022-04-17"));
  const [ammendedExamDate, setAmmendedExamDate] = React.useState("");
  const [examStartTime, setExamStartTime] = React.useState(0);
  const [examEndTime, setExamEndTime] = React.useState(0);
  const [scheduledClass, setScheduledClass] = React.useState(0);
  const [examName, setExamName] = React.useState("");
  const [examDescription, setExamDescription] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpenDialogue = () => {
    setOpen(true);
  };

  const handleCloseDialogue = () => {
    setOpen(false);
  };

  const handleCreateSession = () => {
    //current placeholder for this method only closes the dialogue
    //will replace with .post request when DB connections are complete
    setOpen(false);
  };

  const handleChangeExamDate = (dateTimeString) => {
    var dateString = dateTimeString.toString();
    dateString = dateString.slice(0, 6);
    setExamDate(dateString);
  };
  const handleChangeExamStartTime = (event) => {
    setExamStartTime(event.target.value);
  };

  const handleChangeExamEndTime = (event) => {
    setExamEndTime(event.target.value);
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
    console.log(examDate + " is the old exam date");

    var trimmedString = examDate.toString()
    trimmedString = trimmedString.slice(0, 13);

    setAmmendedExamDate(trimmedString);

    console.log(trimmedString + " is the new exam date");
  }, [examDate]);

  const handleClickSave = () => {
    //validate that exam start time inputs is not null
    //validate that exam end time input is not null
    //validate that class input is not null
    if (examName !== "" && scheduledClass !== 0) {
      setOpen("true");
    } else {
      //add warning dialogue for incomplete form
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="createSession">
        <Card title={"Schedule an Exam"} sx={{ p: 10 }}>
          <Grid container columns={4}>
            <Grid item xs={2} sx={{ p: 3 }}>
              <h1>Exam Date</h1>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={examDate}
                  onChange={(newValue) => setExamDate(newValue)}
                />
              </LocalizationProvider>

              <h1>Exam Duration</h1>

              <FormControl sx={{ pt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MultiInputTimeRangeField
                    id="timeRange"
                    slotProps={{
                      textField: ({ position }) => ({
                        label: position === "start" ? "From" : "To",
                      }),
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
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
            <DialogContentText id="alert-dialog-slide-description">
              
              Date: {ammendedExamDate} <br />
              Class: {scheduledClass}
              <br />
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
      </div>
    </div>
  );
}

export default CreateSession;
