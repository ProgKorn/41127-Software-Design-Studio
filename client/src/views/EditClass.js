import React, { startTransition, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import '../css/AdminPages.css';
import jwt_decode from 'jwt-decode';
import Loader from '../components/Loader';
import Card from '../components/Card';
import axios from 'axios';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import {Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions} from '@mui/material';
import {Table, TableBody, TableCell, TableRow, TableHead, TableContainer} from '@mui/material';
import { FormControl, TextField, Box, Checkbox, Paper, Button, FormLabel} from '@mui/material';

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
function EditClass()
{

    const {subjectId} = useParams();
    const [loading, setLoading] = useState(true);
    const [newSubjectId, setSubjectId] = useState("");
    const [isAdmin, setIsAdmin] = useState(true);
    const [className, setClassName] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [students, setStudents] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [snackbarMessage, setSnackbarMessage] = useState(
        "Error encountered while saving form"
      );
     const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("");


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
          fetchClass();
      }, [isAdmin, navigate]);

      const fetchClass = async() => 
      {
        try {
            const studentResponse = await axios.get(process.env.REACT_APP_SERVER_URL + '/student/get');
            setStudents(studentResponse.data);

             const response = await axios.get("http://localhost:4000" + '/class/getClassDetails/' + subjectId)
             setClassName(response.data.className);
             setSubjectId(subjectId);
             const studentsArray = response.data.students;
             const studentIds = studentsArray.map((element) => element.studentId)
             const currentStudents = studentResponse.data.filter((element) => studentIds.includes(element.studentId))
             setSelectedRows(currentStudents);
             setLoading(false);

        } catch(error) {
            console.log(error);

        }
      
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

      const handleClickSave = () =>
      {
        if ((!className.trim().length)) {
          setSnackbarMessage("Error: No Class Name Provided");
          setSnackbarSeverity("error");
          setSnackbarState(true);
        } else if ((!newSubjectId.trim().length)) {
          setSnackbarMessage("Error: No Subject Id Provided");
          setSnackbarSeverity("error");
          setSnackbarState(true);
        } else if (isNaN(newSubjectId)) {
          setSnackbarMessage("Subject Id not a number");
          setSnackbarSeverity("error");
          setSnackbarState(true);
        } else {
        setOpen(true);
        }
            
      }

      const handleCloseSnackbar = () => {
        setSnackbarState(false);

      };

      const handleCloseDialogue = () => {
        setOpen(false);
      };

      const handleEditClass = () => {
        updateClass();
        handleCloseDialogue();
      };

      const updateClass = async() =>
      {
        const studentsArray = []
        var count = 1
        for(var i = 0; i < selectedRows.length; i++)
        {
          studentsArray.push({studentId: selectedRows[i].studentId, seatNo: count})
          count++;
        }

        const data = 
        {
          "className": className,
          "subjectId": parseInt(newSubjectId),
          "students": studentsArray
        }
        try {

          const response = await axios.post("http://localhost:4000" + '/class/editClassDetails/' + subjectId, data)
          console.log("POST Response received", response);
          setOpen(false);
          
        } catch (error) {
          console.log("Error", error)
        } 
      }
    
      return loading ? <Loader loading={(loading)} /> 
      :(<div className='App'>
          <AdminHeader />
          <Card title={"Edit Class"} sx={{ p: 10 }}>
            <Box sx={{ pl: 10, pr: 10, pb: 2}}>
            <FormControl fullWidth sx={{ pt: 2, minWidth: 120 }}>
                <FormLabel 
                sx = {{
                    textAlign: "left",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight:'bold'
                }}>
                    Class Name
                </FormLabel>
                <TextField
                    value = {className}
                    onChange={event => setClassName(event.target.value)}
                />
            </FormControl>
            <FormControl fullWidth sx={{ pt: 2, minWidth: 120 }}>
                <FormLabel 
                sx = {{
                    textAlign: "left",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight:'bold'
                }}>
                    Subject Id
                </FormLabel>
                <TextField
                    value = {newSubjectId}
                    onChange={event => setSubjectId(event.target.value)}
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
                <FormControl  sx={{ pt: 2}}>
                <Button 
                    variant="contained"
                    color="success"
                    sx={{ p: 2}}
                    onClick={handleClickSave}
                >
                    Edit Class
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
              Confirm Changes to Class
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogue}>Cancel</Button>
            <Button
              color="success"
              variant="contained"
              onClick={handleEditClass}
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

export default EditClass;
