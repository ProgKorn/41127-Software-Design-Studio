import React, { useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../css/AdminTables.css";
import Card from "../components/Card";

function createData(name) {
  return { name };
}

const classes = [
  createData("Class Code 1"),
  createData("Class Code 2"),
  createData("Class Code 3"),
  createData("Class Code 4"),
];

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
  const [selectedRow, setSelectedRow] = React.useState(0);
  const [selectionString, setSelectionString] = React.useState('Select a Class to Begin');
  
  useEffect(() => {
    console.log({ selectedRow });
    
    if(selectedRow!=0){
      setSelectionString(selectedRow + " has been selected")
      //add .get function to retrieve class code
      //add .get function to retrieve number of students
      //add .get function to retrieve number of students
    }
  }, [selectedRow]);
  

  return (
    <div>
      <AdminHeader />
      <div class="adminTable">
        <Card title={"Manage Classes"}>
          <Grid container columns={2}>
            <Grid item xs={1}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {classes.map((thisClass) => (
                      <TableRow
                        hover
                        onClick={() => setSelectedRow(thisClass.name)}
                        key={thisClass.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{thisClass.name}</TableCell>
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
