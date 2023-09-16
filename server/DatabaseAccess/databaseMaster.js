const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Amy:amy@proctordb.ifkuafa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// for inserting new students
async function insertStudent(docs) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("StudentDetails");
  return await coll.insertMany(docs);
}

// for deleting students
async function deleteStudent(studentId) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("StudentDetails");
  return await coll.deleteMany({ studentId });
}

async function findStudent(studentId) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("StudentDetails");
  const cursor = coll.find({ studentId });
  const results = [];
  await cursor.forEach(doc => results.push(doc));
  return results;
}

async function updateStudent(studentId, updateDoc) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("StudentDetails");
  return await coll.updateMany({ studentId }, { $set: updateDoc });
}

// for inserting a new Exam
async function insertExam(docs) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("ExamDetails");
  return await coll.insertMany(docs);
}

// for deleting an exam
async function deleteExam(examId) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("ExamDetails");
  return await coll.deleteMany({ examId });
}

async function findExam(examId) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("ExamDetails");
  const cursor = coll.find({ examId });
  const results = [];
  await cursor.forEach(doc => results.push(doc));
  return results;
}

async function updateExam(examId, updateDoc) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("ExamDetails");
  return await coll.updateMany({ examId }, { $set: updateDoc });
}

module.exports = {
  // master function (entry represents the details)
  dbOp: async function (operationType, entry) {
    await client.connect();
    try {
      let result;
      switch (operationType) {
        // Example usage:
        /*
        {
          "name": {
            "firstName": "Example",
            "lastName": "User"
          },
          "studentId": 12345678,
          "seatNumber": 1,
          "faceImageUrl": "URL"
        }
        */
        // dbOp('insert', [{ /* your document here */ }]
        case 'insert-student':
          result = await insertStudent(entry);
          console.log("Inserted IDs:", result.insertedIds);
          break;

        // Example usage:
        // dbOp('delete', 12345678)
        case 'delete-student':
          result = await deleteStudent(entry);
          console.log("Deleted count:", result.deletedCount);
          break;

        // Example usage:
        // // dbOp('find', 12345678)
        case 'find-student':
          result = await findStudent(entry);
          console.log("Found documents:", result);
          return result;
          break;

        // Example usage:
        // dbOp('update', { studentId : 12345678, updateDoc: { seatNumber : 200 }})
        case 'update-student':
          result = await updateStudent(entry.studentId, entry.updateDoc);
          console.log("Updated count:", result.modifiedCount);
          break;

          case 'insert-exam':
            result = await insertExam(entry);
            console.log("Inserted IDs:", result.insertedIds);
            break;
  
          case 'delete-exam':
            result = await deleteExam(entry);
            console.log("Deleted count:", result.deletedCount);
            break;
  
          case 'find-exam':
            const db = client.db("SoftwareDesignStudio");
            const coll = db.collection("ExamDetails");
            const cursor = coll.find({});
            return cursor.toArray(); // Convert the cursor to an array
  
          case 'update-exam':
            result = await updateExam(entry.examId, entry.updateDoc);
            console.log("Updated count:", result.modifiedCount);
            break;

        default:
          console.log("Invalid operation type.");
      }

    } finally {
      setTimeout(async ()  => await client.close(), 5000)
    }
  }
};