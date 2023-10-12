import React, { useState, useEffect } from "react";
import "../css/Exam.css";
import { useNavigate, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import StudentHeader from "../components/StudentHeader";
import { Checkbox, Button, FormControlLabel } from "@mui/material";
import axios from "axios";

function createData(name, value) {
  return { name, value };
}



function ExamStart() {
  const [isChecked, setIsChecked] = useState(false);
  const [examDetails, setExamDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize as true
  const navigate = useNavigate();
  const {studentId} = useParams();
  const {examId} = useParams();
  console.log("URL Parameters:", studentId, examId);

  const fetchExamDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/exam/getExamDetails");
      console.log("Exam Details Response:", response.data); // Log the response
      setExamDetails(response.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchExamDetails();
  }, []);

  // Handle exam details table contents, using fetched data
  const rows = [
    createData("Exam Name", examDetails ? examDetails[0].examName : "Loading..."),
    createData("Exam Details", examDetails ? examDetails[0].details : "Loading..."),
    createData("Start Time", examDetails ? examDetails[0].startTime : "Loading..."),
    createData("End Time", examDetails ? examDetails[0].endTime : "Loading..."),
  ];


  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleButtonClick = () => {
    navigate("/examsession");
  };

  return (

    <Box>
      <StudentHeader />
      <Box className="main">
        {/* Title */}
        <Box className="title">
          <h1>Exam Start</h1>
        </Box>
        {/* Exam detail section */}
        <Box className="subtitle">
          <Box>
            <h2>Exam Details</h2>
          </Box>
        </Box>
        {/* Details table goes here */}
        <Box className="detailsTable">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        backgroundColor: "#2b2d42",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      width="250px"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right" width="250px">
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Terms and conditions section */}
        <Box className="subtitle">
          <h2>Terms and Conditions</h2>
        </Box>
        {/* Terms and conditions box and checkbox go here */}
        <Box className="terms">
          <p>
            These terms and conditions (the "Agreement") govern the use of an AI Online Exam Proctoring Tool (the "Service") provided by Sentinel (the "Company") to the user (the "User"). By using this service, the user agrees to abide by the terms and conditions outlined below.
          </p>
          <p>
            1. Acceptance of Terms
          </p>
          <p>
            By using this service, the User acknowledges and agrees to these Terms and Conditions. If the User does not agree to these terms, they should refrain from using the Service.
          </p>
          <p>
            2. User Eligibility
          </p>
          <p>
            This Service is intended for use by educational institutions, examiners and students. To use the service, users must be at least 18 years of age or have the consent of a parent or guardian to use the Service.
          </p>
          <p>
            3. Registration and Account Security
          </p>
          <p>
            The User is responsible for maintaining the confidentiality of their login credentials and account information. The User is also responsible for any activities conducted through their account. If the User suspects any unauthorised access to their account, they must notify their provider immediately.
          </p>
          <p>
            4. Privacy and Data Usage
          </p>
          <p>
            The Provider may collect, use and process personal data and information provided by the User in accordance with the Privacy Policy, which can be found on the provider's website.
          </p>
          <p>
            5. Proctoring and Monitoring
          </p>
          <p>
            The Service uses AI and other technologies to proctor and monitor online exams. This includes but is not limited to webcam, microphone and screen mirroring. The User's actions, such as eye movements and background noise, may be recorded during an examination.
          </p>
          <p>
            6. Code of Conduct
          </p>
          <p>
            The User agrees to adhere to the following code of conduct while using the Service:
          </p>
          {/* Checkbox form that activates the continue button */}
          <FormGroup className="formBox">
            <FormControlLabel
              required
              control={
                <Checkbox
                  className="checkBoxStyle"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              }
              label={<strong>I agree to the terms and conditions</strong>}
            />
          </FormGroup>
        </Box>
        <Box className="continueButtonBox">
          <Button
            disabled={!isChecked}
            onClick={handleButtonClick}
            variant="contained"
            className="continueButton"
            style={{
              backgroundColor: isChecked ? "#2b2d42" : "grey",
            }}
          >
            <strong>Continue</strong>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ExamStart;
