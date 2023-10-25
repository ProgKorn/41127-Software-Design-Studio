import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminHeader from "../components/AdminHeader";
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
import "../css/AdminTables.css";
import Card from "../components/Card";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import Loader from "../components/Loader";
import { formatISODate } from '../components/Clock';

function createData(examName, term, examiner, attendance, examStart, examEnd, status, sessionNo) {
  return { examName, term, examiner, attendance, examStart, examEnd, status, sessionNo };
}

const columns = [
  'Exam Name', 'Exam Start', 'Exam End', 'Details', 'Session #'
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

function ExamHistory() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [exams, setExams] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const examId = 1;
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
    fetchExams();
  }, [isAdmin, navigate]);

  const fetchExams = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL +'/exam/getExamDetails/');
      setExams(response.data)
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return loading ? <Loader loading={true} /> : (
    <div className="ExamHistory">
      <AdminHeader />
      <div className="adminTable">
        <Card title={"Exam History"}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                {exams.map((exam)  => (
                  <TableRow  sx={tableRowStyle}>
                    <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="left">{exam.examName}</TableCell>
                    <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="left">{formatISODate(exam.startTime)}</TableCell>
                    <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="left">{formatISODate(exam.endTime)}</TableCell>
                    <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="left">{exam.details}</TableCell>
                    <TableCell style={{fontFamily: 'Montserrat, sans-serif'}} align="left">
                      <a href={`/exam/${exam.examId}`} style={{ color: 'black' }}>
                        {exam.examId}
                      </a>
                 </TableCell>
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
