import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { styled } from "@mui/material/styles";
import LinkIcon from '@mui/icons-material/Link';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../css/AdminTables.css";
import StatusChip from "../components/StatusChip";
import axios from "axios";
import Card from "../components/Card";
import jwt_decode from "jwt-decode";
import Loader from "../components/Loader";

function FlagLog() {
  const [flags, setFlags] = React.useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFlagDetails = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/flag/getAllFlags");
      const initialFlags = response.data
      setFlags(initialFlags);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        navigate("/noaccess");
      }
    }
    fetchFlagDetails();
  }, [navigate]);

  const columns = [
    'Session', 'Examinee ID', 'Flag Type', 'Status', 'Exam ID', 'Link'
  ]

  const tableTitleTextStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700, 
    color: 'rgb(85, 89, 130)'
  }

  const StyledTableCell = styled(TableCell)(() => ({
    fontFamily: 'Montserrat, sans-serif'
  }));

  return loading ? <Loader loading={true} /> : <div>
      <AdminHeader />
      <div class="adminTable" style={{ height: '80vh'}}>
        <Card title={"Flagged Incidents"} style={{ height: '100%'}}>
          <TableContainer style={{overflow: 'auto', maxWidth: '100%', height: '90%'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
                  {columns.map((col) => (
                    <TableCell  sx={tableTitleTextStyle} align='center' style={{fontFamily: 'Montserrat, sans-serif'}}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {flags && flags.map((flag) => (
                  <TableRow>
                    <StyledTableCell align="center">{flag.sessionName}</StyledTableCell>
                    <StyledTableCell align="center">{flag.studentId}</StyledTableCell>
                    <StyledTableCell align="center">{flag.description}</StyledTableCell>
                    <StyledTableCell align="center">
                      <StatusChip status={flag.status} />
                    </StyledTableCell>
                    <StyledTableCell align="center">{flag.examId}</StyledTableCell>
                    <StyledTableCell align="center">
                      <a href={`/flag/${flag.flagId}`} >
                          <LinkIcon/>
                      </a>
					          </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </div>}

export default FlagLog;