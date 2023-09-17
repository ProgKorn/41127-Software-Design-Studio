import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import "../css/Exam.css";

function createData(name, value) {
  return { name, value };
}

const rows = [
  createData("Type", "Live"),
  createData("Term", "Spring"),
  createData("Exam Start", "9:00:00"),
  createData("Exam End", "11:00:00"),
  createData("Duration", "2 hours"),
];

function ExamStart() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

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
                        backgroundColor: "#109cfc",
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
        {/* Terms and conditions box and checkbox goes here */}
        <Box className="terms">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa
            tempor nec feugiat nisl pretium fusce id velit. Turpis egestas
            integer eget aliquet nibh praesent tristique magna. Ligula
            ullamcorper malesuada proin libero. Sagittis id consectetur purus ut
            faucibus pulvinar elementum integer. Viverra vitae congue eu
            consequat ac felis. Id ornare arcu odio ut sem nulla pharetra diam
            sit. Volutpat diam ut venenatis tellus in metus vulputate eu. In
            aliquam sem fringilla ut morbi tincidunt augue. Lectus vestibulum
            mattis ullamcorper velit sed ullamcorper morbi. Consequat semper
            viverra nam libero justo laoreet sit amet. Malesuada fames ac turpis
            egestas. Vitae et leo duis ut diam quam nulla. Dignissim cras
            tincidunt lobortis feugiat. Orci nulla pellentesque dignissim enim
            sit amet.
          </p>
          <p>
            Tincidunt ornare massa eget egestas. Neque sodales ut etiam sit amet
            nisl purus. Elementum facilisis leo vel fringilla est ullamcorper
            eget nulla facilisi. Amet cursus sit amet dictum sit amet. Tincidunt
            dui ut ornare lectus sit amet. Neque convallis a cras semper auctor
            neque vitae tempus. Est lorem ipsum dolor sit amet consectetur
            adipiscing. Elit sed vulputate mi sit. Adipiscing elit ut aliquam
            purus sit amet. Quis commodo odio aenean sed. Eu lobortis elementum
            nibh tellus. Et netus et malesuada fames ac turpis egestas. Cras
            ornare arcu dui vivamus arcu felis. Quam vulputate dignissim
            suspendisse in est. Quam id leo in vitae turpis massa sed. Nulla at
            volutpat diam ut venenatis tellus in metus. Est pellentesque elit
            ullamcorper dignissim. Ultrices neque ornare aenean euismod
            elementum nisi quis eleifend. Nisl rhoncus mattis rhoncus urna.
            Praesent tristique magna sit amet purus gravida.
          </p>
          <p>
            Fringilla phasellus faucibus scelerisque eleifend donec pretium. In
            mollis nunc sed id semper risus in hendrerit gravida. Arcu cursus
            euismod quis viverra. Ornare lectus sit amet est placerat in. Augue
            ut lectus arcu bibendum at varius vel pharetra vel. In pellentesque
            massa placerat duis ultricies lacus sed turpis tincidunt. Vitae
            tortor condimentum lacinia quis vel eros donec. Vel facilisis
            volutpat est velit egestas. Et tortor consequat id porta nibh. Hac
            habitasse platea dictumst vestibulum rhoncus est pellentesque elit.
            Nisl purus in mollis nunc.
          </p>
          <p>
            Mattis aliquam faucibus purus in massa tempor. Convallis posuere
            morbi leo urna molestie. In fermentum posuere urna nec tincidunt
            praesent semper. Et sollicitudin ac orci phasellus egestas tellus
            rutrum. Elit duis tristique sollicitudin nibh sit amet. Ut porttitor
            leo a diam sollicitudin tempor id eu nisl. Eget arcu dictum varius
            duis at consectetur lorem donec. Elementum curabitur vitae nunc sed
            velit dignissim sodales ut eu. Pharetra et ultrices neque ornare
            aenean euismod elementum nisi. Sem et tortor consequat id porta
            nibh. Sapien eget mi proin sed libero enim. Tortor condimentum
            lacinia quis vel eros donec ac. Id diam maecenas ultricies mi eget
            mauris.
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
              backgroundColor: isChecked ? "#109cfc" : "grey", // Change colors based on isChecked
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
