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
                //find the seatNo in the found class associated with the student id
                   const foundStudent = foundClass.students.find(student => student.studentId == studentId)
                //add seatNo to the exam
                   examData[i]["seatNo"] = foundStudent.seatNo;
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

router.post('/addClass', async (req, res) => { // Add a new exam and update the chosen class with exam 
    try {
      
        //create instance of exam using the parameters in the request body
        const newClass = {
            className: req.body.className, 
            subjectId: req.body.subjectId,
            students: req.body.students,
            examId: 0,
        };
    
        //create exam in the ExamDetails collection of mongodbDatabase
        const createdClass = await databaseMaster.dbOp('insert', 'ClassDetails', { docs: [newClass] });
        res.json(createdClass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/getClassDetails/:subjectId', async(req,res) => {
    try{
        const data =  await databaseMaster.dbOp('find', 'ClassDetails', {query: {subjectId:  parseInt(req.params.subjectId)}});
        res.json(data[0]);
    } catch (error){
        console.error("error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    

});

router.post('/editClassDetails/:subjectId', async (req,res) => {
    try {
        //the subjectId in the params is the old subjectId
        // the subject id in the request body is the updated subjectId (could be the same as the params, if it is not updated)
     const query = {subjectId : parseInt(req.params.subjectId)}
     const docs = { $set: { subjectId: req.body.subjectId, className: req.body.className, students: req.body.students } };
     const data = await databaseMaster.dbOp('update', 'ClassDetails', { query, docs});
     res.json(data);
  
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  router.get('/deleteClassDetails/:subjectId', async (req,res) => {
    try {
      const query = { subjectId: parseInt(req.params.subjectId) };
      const data = await  databaseMaster.dbOp('delete', 'ClassDetails', { query });
      res.json(data);
  
      } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

module.exports = router;