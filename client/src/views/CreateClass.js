import AdminHeader from '../components/AdminHeader';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Card from '../components/Card';
import "../css/AdminFonts.css";
import { FormControl, TextField, Box, Checkbox, Paper, Button} from '@mui/material';
import Slide from "@mui/material/Slide";
import {Table, TableBody, TableCell, TableRow, TableHead, TableContainer} from '@mui/material';
import Loader from '../components/Loader';
import axios from 'axios';
import {Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions} from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const columns =  [ "Add Student", "Student Id", "First Name", "Last Name", "email"

]

const tableTitleTextStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700, 
    color: 'rgb(85, 89, 130)'
  }
  
  const tableRowStyle = {
    '&:last-child td, &:last-child th': { border: 0 },
    fontFamily: 'Montserrat, sans-serif'
  }

function CreateClass() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [className, setClassName] = useState(" ");
    const [subjectId, setSubjectId] = useState(" ");
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [studentsString, setStudentsString] = useState(" ");
    const [snackbarMessage, setSnackbarMessage] = useState(
        "Error encountered while saving form"
      );
      const [snackbarState, setSnackbarState] = useState(false);
      const [snackbarSeverity, setSnackbarSeverity] = useState("");

    
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.isAdmin === true) {
          setIsAdmin(true);
        } else {
          navigate("/noaccess");
        }
      }
      fetchStudents();
    }, [isAdmin, navigate]);


      const fetchStudents = async() => {
        try{
          const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/student/get');
          setStudents(response.data);
          setLoading(false);
        }
        catch (error) {
          console.log("The error" + error);
        }
      }

      const addClass = async() => {
        const studentsArray = []
        var count = 1
        for(var i = 0; i < selectedRows.length; i++)
        {
          studentsArray.push({studentId: selectedRows[i].studentId, seatNo: count})
          count++;
        }
        const requestBody = { 
          className: className,
          subjectId: parseInt(subjectId), 
          students: studentsArray };
    
        try{
          const response = await axios.post(process.env.REACT_APP_SERVER_URL +'/class/addClass', requestBody);
          console.log('POST request response:', response.data);
          setOpen(false);
        }
        catch (error) {
          console.log("The error" + error);
        }
      }

      const handleChangeClassName = (event) => {
        setClassName(event.target.value);
      };

      const handleChangeSubjectId = (event) => {
        setSubjectId(event.target.value);
      };

      const handleClickSave = () => {
        if (className == "") {
            setSnackbarMessage("Error: No Class Name Provided");
            setSnackbarSeverity("error");
            setSnackbarState(true);
        } else if (subjectId == "") {
            setSnackbarMessage("Error: No Subject Id Provided");
            setSnackbarSeverity("error");
            setSnackbarState(true);
        } else if (isNaN(subjectId)) {
            setSnackbarMessage("Subject Id not a number");
            setSnackbarSeverity("error");
            setSnackbarState(true);
        } else {
            setStudentsString(selectedRows.map((element)=> element.name.firstName + " " + element.name.lastName).join(", "));
            setOpen(true);
        }
      };

      const handleCreateClass = () => {
        //current placeholder for this method only closes the dialogue
        //will replace with .post request when DB connections are complete
        addClass();
      };

      const handleCloseSnackbar = () => {
        setSnackbarState(false);
      };
    
      const handleCloseDialogue = () => {
        setOpen(false);
        setSelectedRows([]);
      };

      const handleRowSelection = (student) => {
        const selectedIndex = selectedRows.indexOf(student);
        const newSelected = [...selectedRows];
    
        if (selectedIndex === -1) {
          newSelected.push(student);
        } else {
          newSelected.splice(selectedIndex, 1);
        }
    
        setSelectedRows(newSelected);
      };

    return (loading) ? <Loader loading={true} /> : (
    <div>
        <AdminHeader/>
        <Card title={"Create a Class"} sx={{ p: 10 }}>
            <Box sx={{ pl: 10, pr: 10 }}>
                <FormControl fullWidth sx={{ pt: 2, minWidth: 120 }}>
                    <TextField
                    required
                    fullWidth
                    label="Class Name"
                    id="fullWidth"
                    onChange={handleChangeClassName}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ pt: 3, minWidth: 120 }}>
                    <TextField
                    required
                    fullWidth
                    label="Subject Id"
                    id="fullWidth"
                    onChange={handleChangeSubjectId}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ pt: 3, minWidth: 120 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, maxHeight: "70%"}} aria-label="simple table">
                            <TableHead>
                            <TableRow >
                                    {columns.map((col) => (
                                    <TableCell  sx={tableTitleTextStyle} align='left' style={{fontFamily: 'Montserrat, sans-serif'}}>
                                        {col}
                                    </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student) => {
                                    const isSelected = selectedRows.indexOf(student) !== -1;
                                    return (
                                    <TableRow  sx={tableRowStyle}
                                        key={student.studentId}
                                        selected={isSelected}
                                    >
                                        <TableCell>
                                        <Checkbox
                                            color="primary"
                                            checked={isSelected}
                                            onChange={() => handleRowSelection(student)}
                                        />
                                        </TableCell>
                                        <TableCell style={{fontFamily: 'Montserrat, sans-serif'}}>{student.studentId}</TableCell>
                                        <TableCell style={{fontFamily: 'Montserrat, sans-serif'}}>{student.name.firstName} </TableCell>
                                        <TableCell style={{fontFamily: 'Montserrat, sans-serif'}}>{student.name.lastName}</TableCell>
                                        <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} >{student.email}</TableCell>
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </FormControl>
                <FormControl sx={{ pt: 3 }}>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ p: 2 }}
                        onClick={handleClickSave}
                    >
                        Create Class
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
            <DialogTitle> {"Confirm Class Creation"}</DialogTitle>
            <DialogContent>
                <DialogContentText
                id="alert-dialog-slide-description"
                maxWidth={"lg"}
                >
                Class Name: {className} <br />
                Subject Id: {subjectId} <br />
                Students: {studentsString} <br />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialogue}>Cancel</Button>
            <Button
              color="success"
              variant="contained"
              onClick={handleCreateClass}
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
    
export default CreateClass;