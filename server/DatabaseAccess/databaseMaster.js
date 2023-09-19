const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);
const bcrypt = require('bcrypt');

// for inserting new user details
async function insertUser(docs) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("UserDetails");
  return await coll.insertMany(docs);
}

// for deleting user records
async function deleteUser(email) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("UserDetails");
  return await coll.deleteMany({ email });
}

async function findUser(email) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("UserDetails");
  const cursor = coll.find({ email });
  const results = [];
  await cursor.forEach(doc => results.push(doc));
  return results;
}

async function updateUser(email, updateDoc) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("UserDetails");
  // since we do not have a user registration page, this logic handles the password hashing.
  if (updateDoc.password) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(updateDoc.password, saltRounds);
    updateDoc.password = hashedPassword;
  }
  return await coll.updateMany({ email }, { $set: updateDoc });
}

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

async function findStudent(email) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("StudentDetails");
  const cursor = coll.find({ email });
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
        
        // dbOp('insert', [{ /* your document here */ }]
        case 'insert-user':
          result = await insertUser(entry);
          console.log("Inserted IDs:", result.insertedIds);
          break;

        // dbOp('delete', 12345678)
        case 'delete-user':
          result = await deleteUser(entry);
          console.log("Deleted count:", result.deletedCount);
          break;
        
        // dbOp('find', 12345678)
        case 'find-user':
          result = await findUser(entry.email);
          console.log("Found documents:", result);
          return result;
      
        // dbOp('update', { studentId : 12345678, updateDoc: { seatNumber : 200 }})
        case 'update-user':
          result = await updateUser(entry.email, entry.updateDoc);
          console.log("Updated count:", result.modifiedCount);
          break;

        default:
          console.log("Invalid operation type.");
      }
    } finally {
      // Note: may need to increase this time. Login takes longer than other operations.
      setTimeout(async ()  => await client.close(), 6000)
    }
  }
};
