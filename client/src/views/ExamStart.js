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
import Loader from '../components/Loader';
import { Checkbox, Button, FormControlLabel } from "@mui/material";
import axios from "axios";

function ExamStart() {
  const [isChecked, setIsChecked] = useState(false);
  const [examDetails, setExamDetails] = useState(null);
  // const [transformedDetails, setTransformedDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize as true
  const navigate = useNavigate();
  const {studentId} = useParams();
  const {examId} = useParams();
  const {seatNo} = useParams();
  console.log("URL Parameters:", studentId, examId);

  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL +`/exam/getExamDetails/${examId}`);
      console.log("Exam Details Response:", response.data); // Log the response
      const examData = {
        "Exam Name": response.data.examName,
        "Exam Date": new Date(response.data.startTime).toLocaleDateString("en-GB"),
        "Start Time": new Date(response.data.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        "End Time": new Date(response.data.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        Details: response.data.details,
      };
      setExamDetails(examData);
      console.log("Exam Details:", examDetails);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleButtonClick = () => {
    navigate(`/examverify/${studentId}/${examId}/${seatNo}`);
  };

  if (loading)
   {
      return <Loader loading={loading} />
   }

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
                {/* {examDetails.map((examDetail) => ( */}
                {Object.entries(examDetails).map(([name, value]) => (
                  <TableRow
                    key={name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        backgroundColor: "#2b2d42",
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                      width="250px"
                    >
                      {name}
                    </TableCell>
                    <TableCell align="center" width="250px" sx={{
                        fontFamily: "Montserrat, sans-serif"
                      }}>
                      {value}
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
            These terms and conditions (the "Agreement") govern the use of an AI Online Exam Proctoring Tool (the "Service") provided by Sentinel (the "Company") to the user (the "User"). By using this service, the user agrees to abide by the terms and conditions outlined below:
          </p>
          <br />
          <p align="left" style={{fontWeight: 'bold'}}>
            1. Acceptance of Terms
          </p>
          <p align="left">
            By using this service, the User acknowledges and agrees to these Terms and Conditions. If the User does not agree to these terms, they should refrain from using the Service.
          </p>
          <p align="left" style={{fontWeight:'bold'}}>
            2. User Eligibility
          </p>
          <p align="left">
            This Service is intended for use by educational institutions, examiners and students. To use the service, users must be at least 18 years of age or have the consent of a parent or guardian to use the Service.
          </p>
          <p align="left" style={{fontWeight:'bold'}} >
            3. Registration and Account Security
          </p>
          <p align="left">
            The User is responsible for maintaining the confidentiality of their login credentials and account information. The User is also responsible for any activities conducted through their account. If the User suspects any unauthorised access to their account, they must notify their provider immediately.
          </p>
          <p align="left" style={{fontWeight:'bold'}}>
            4. Privacy and Data Usage
          </p>
          <p align="left">
            The Provider may collect, use and process personal data and information provided by the User in accordance with the Privacy Policy, which can be found on the provider's website.
          </p>
          <p align="left" style={{fontWeight:'bold'}}>
            5. Proctoring and Monitoring
          </p>
          <p align="left">
            The Service uses AI and other technologies to proctor and monitor online exams. This includes but is not limited to webcam, microphone and screen mirroring. The User's actions, such as eye movements and background noise, may be recorded during an examination.
          </p>
          <p align="left" style={{fontWeight:'bold'}}>
            6. Code of Conduct
          </p>
          <p align="left">
            The User agrees to adhere to the following code of conduct while using the Service:
            <br />
            a. The User will not attempt to cheat or engage in any form of academic dishonesty.<br />
            b. The User will not impersonate or provide false information. <br />
            c. The User will not disrupt or interfere with the operation of the Service. <br />
            d. The User will not attempt to reverse engineer, hack, or modify the Service. <br />
            e. The User will not share or distribute exam content without permission.
          </p>
          <p align="left" style={{fontWeight:'bold'}}>
            7. Exam Results and Reporting
          </p>
          <p align="left">
              The Provider will share the results of proctored examinations and corresponding flag logs with authorised  individuals or organizations, such as instructors, educational institutions, or third-party exam providers, as specified by the User or required by law.
          </p>
          <p align="left" style={{fontWeight:'bold'}}>
            8. Termination
          </p>
          <p align="left">
            The Provider reserves the right to suspend or terminate a User's access to the Service at any time, for any reason, without notice. In case of termination, the User will not be entitled to a refund of any fees paid.
          </p>
          <p align="left" style={{fontWeight:'bold'}}>
            9. Contact Information
          </p>
          <p align="left">
            For any questions or concerns regarding these Terms and Conditions or the Service, the User may contact the Provider at service@Sentinel.com.
          </p>
          <br /> 
          <p>
            By using the AI Online Exam Proctoring Tool, the User acknowledges and accepts these Terms and Conditions.
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
              label={<strong style={{
                fontFamily: "Montserrat, sans-serif"
              }}>I agree to the terms and conditions</strong>}
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
              fontFamily: "Montserrat, sans-serif"
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
