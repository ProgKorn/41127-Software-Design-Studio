import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import AdminHeader from "../components/AdminHeader";
import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../css/AdminTables.css";
import Card from "../components/Card";
import axios from 'axios';
import Loader from '../components/Loader'

//TO-DO:
//Retrieve and class details (subject, class members, etc)
//Retrieve and Store 

function createData(name) {
  return { name };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 1148,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ManageClasses() {
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchClasses  = async () => {
    try {
      const response = await axios.get("http://localhost:4000/class/get/");
      setClasses(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
		const decodedToken = jwt_decode(token);
		if (decodedToken.isAdmin === true) {
			setIsAdmin(true);
      fetchClasses();
		} else {
			navigate('/noaccess'); 
			}
		}
	}, [isAdmin, navigate]);

  const [selectedRow, setSelectedRow] = React.useState(0);
  const [selectionString, setSelectionString] = React.useState('Select a Class to Begin');
  
  useEffect(() => {
    console.log({ selectedRow });
    
    if(selectedRow !== 0){
      setSelectionString(selectedRow + " has been selected")
      //add .get function to retrieve class code
      //add .get function to retrieve number of students
      //add .get function to retrieve number of students
    }
  }, [selectedRow]);
  

  return (loading) ? <Loader loading={true} /> : (
    <div>
      <AdminHeader />
      <div class="adminTable">
        <Card title={"Manage Classes"}>
          <Grid container columns={2}>
            <Grid item xs={1}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {classes.map((row) => (
                      <TableRow
                        hover
                        onClick={() => setSelectedRow(row.className)}
                        key={row.className}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{row.className}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={1}>
              <p>{selectionString}</p>
            </Grid>
          </Grid>
        </Card>
      </div>
	</div>
  );
}

export default ManageClasses;
