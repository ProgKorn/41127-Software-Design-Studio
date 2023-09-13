import React, { useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../css/AdminViews.css";

function createData(session, examinee, flag, status, flag_no, session_no) {
  return { session, examinee, flag, status, flag_no, session_no };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 1),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 1),
  createData("Eclair", 262, 16.0, 24, 6.0, 1),
  createData("Cupcake", 305, 3.7, 67, 4.3, 1),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function FlagLog() {

	// const [flags, setFlags] = React.useState([])
	// useEffect(()=> {
	// 	axios.get('http://localhost:3000/getFlagLog')
  //   .then(flags => setFlags(flags.data))
  //   .catch(err => console.log(err))
	// }, [])

  return (
    <div className="FlagLog">
      <AdminHeader />
      <h1>Flag Log</h1>
      <Button
        component={Link}
        to="/flag"
        variant="contained"
        startIcon={<FlagRoundedIcon />}
      >
        Flag Page
      </Button>
      <div className="flagLogTable">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Session</StyledTableCell>
				<StyledTableCell align="left">Examinee</StyledTableCell>
                <StyledTableCell align="left">Flag</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Flag No.</StyledTableCell>
				<StyledTableCell align="left">Session No.</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((flag) => (
                <TableRow>
                  <TableCell align="left">{flag.session}</TableCell>
				  <TableCell align="left">{flag.examinee}</TableCell>
                  <TableCell align="left">{flag.flag}</TableCell>
                  <TableCell align="left">{flag.status}</TableCell>
                  <TableCell align="left">{flag.flag_no}</TableCell>
				  <TableCell align="left">{flag.session_no}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default FlagLog;
