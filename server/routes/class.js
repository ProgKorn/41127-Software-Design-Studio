const express = require('express');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const router = express.Router();
//const Class = require('../models/classModel');

router.get('/get', (req, res) => {
    databaseMaster.dbOp('find', 'ClassDetails', { query: {} }).then(data => {
        /* for(i = 0; i < data.length(); i++)
        {}; */
        res.json(data);
        });
});

router.get('/get/:studentId', (req,res) => {
    const studentId = req.params.studentId;
    databaseMaster.dbOp('find', 'ClassDetails', {query: {students: { $elemMatch: { studentId: parseInt(studentId)}}}}).then(data => {
        res.json(data);
    });
});

router.get('/get-exam/:studentId', (req, res) => {
    const studentId = parseInt(req.params.studentId);

    // Search for the student in the ClassDetails collection
    databaseMaster.dbOp('find', 'ClassDetails', { query: { "students.studentId": studentId } })
        .then(data => {
            // Check if any documents were found
            if (data && data.length > 0) {
                // Assuming there may be multiple students with the same studentId in different exams,
                // you can retrieve all the examIds where the student is found.
                const examIds = data.map(doc => doc.examId);

                // Send the list of exams to the client
                databaseMaster.dbOp('find', 'ExamDetails', { query: { examId: {$in: examIds} }})
                    .then(examData => {
                
                //iterate through the each exam
                for (i = 0; i < examData.length; i++){
                //find the class associated with the examID
                   const foundClass =  data.find(document => document.examId == examData[i].examId)
                //find the seatNumber in the found class associated with the student id
                   const foundStudent = foundClass.students.find(student => student.studentId == studentId)
                //add seatNumber to the exam
                   examData[i]["seatNumber"] = foundStudent.seatNumber;
                }
                res.json(examData)
                })
                
            } else {
                // No matching student found
                res.json([]);
            }
        })
        .catch(error => {
            // Handle any errors here
            console.error(error);
            res.status(500).json({ error: "An error occurred while searching for the student." });
        });
});



module.exports = router;