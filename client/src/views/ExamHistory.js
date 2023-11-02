import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../css/AdminTables.css";
import Card from "../components/Card";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { formatISOTime } from "../components/Clock";
import Loader from "../components/Loader";

function ExamHistory() {
  const [exams, setExams] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/exam/getExamDetails");
      const orderedExams = response.data.sort((a,b)=>{return new Date(a.startTime) - new Date(b.startTime)})
      setExams(orderedExams);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        setIsAdmin(true);
      } else {
        navigate('/noaccess'); 
	    }
	  }
    fetchExamDetails();
  }, [isAdmin, navigate]);

  const columns = [
    'Name', 'Date', 'Start', 'End', 'Details', 'Session'
  ]

  const tableTitleTextStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700, 
    color: 'rgb(85, 89, 130)'
  }

  const tableRowStyle = {
    '&:last-child td, &:last-child th': { border: 0 },
    fontFamily: 'Montserrat, sans-serif',
    height: 100
  }

  const StyledTableCell = styled(TableCell)(() => ({
    fontFamily: 'Montserrat, sans-serif'
  }));

  return loading ? <Loader loading={true} /> : (
    <div className="ExamHistory">
      <AdminHeader />
      <div className="adminTable">
        <Card title={"Exam History"}>
          <TableContainer >
            <Table aria-label="simple table">
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
                {exams && exams.map((exam) => (
                  <TableRow key={exam.examId}
                  sx={tableRowStyle}>
                    <StyledTableCell align="center" style={{ fontWeight: 'bold', textAlign: 'left', width: '30%' }}>{exam.examName}</StyledTableCell>
                    <StyledTableCell align="center">{(new Date(exam.startTime).toDateString())}</StyledTableCell>
                    <StyledTableCell align="center">{formatISOTime(exam.startTime)}</StyledTableCell>
                    <StyledTableCell align="center">{formatISOTime(exam.endTime)}</StyledTableCell>
                    <StyledTableCell align="center" style={{textOverflow: 'ellipsis', width: '30%', textAlign: 'left'}}>{exam.details}</StyledTableCell>
                    <StyledTableCell align="center">{
                      <a href={`/exam/${exam.examId}`}>
                        {exam.examId}
                      </a>
                 }</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </div>
  );
}

export default ExamHistory;