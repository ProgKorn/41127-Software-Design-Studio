const { MongoClient, Binary } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);
const bcrypt = require('bcrypt');

async function insertDoc(collType, docs) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection(collType);
  return await coll.insertMany(docs);
}

async function deleteDoc(collType, query) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection(collType);
  return await coll.deleteMany(query);
}

async function updateUser(email, updateDoc) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("UserDetails");
  if (updateDoc.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(updateDoc.password, saltRounds);
    updateDoc.password = hashedPassword;
  }
  return await coll.updateMany({ email }, { $set: updateDoc });
}

async function findDoc(collType, query) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection(collType);
  const cursor = coll.find(query);
  const results = [];
  await cursor.forEach(doc => results.push(doc));
  return results;
}

async function updateDocument(collType, query, docs) { 
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection(collType);
  return await coll.updateMany(query, docs);
}

async function uploadVideo(studentId, examId, fullRecording) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("Exam-Student");

  // Query for the document to update
  const query = {studentId, examId};

  // Convert Node.js Buffer to MongoDB Binary
  const binaryData = new Binary(fullRecording.buffer);

  // Update field fullRecording
  const update = { $set: { "fullRecording": binaryData } };
  return await coll.updateOne(query, update);
}

module.exports = {
  dbOp: async function (operationType, collType, entry) {
    await client.connect();
    let result;
    try {
      const { query, docs, email, updateDoc, studentId, examId, fullRecording } = entry;
      switch (operationType) {
        case 'insert':
          result = await insertDoc(collType, docs);
          console.log('Insert Doc Result:', result);
          break;
        case 'delete':
          result = await deleteDoc(collType, query);
          console.log('Delete Doc Result:', result);
          break;
        case 'find':
          result = await findDoc(collType, query);
          console.log('Find Doc Input:', query);
          console.log('Find Doc Result:', result);
          return result;
        case 'update-user':
          result = await updateUser(email, updateDoc);
          console.log('Update User Result:', result);
          break;
        case 'update':
          result = await updateDocument(collType, query, docs);
          console.log('Update Doc Result:', result);
          break;
        case 'upload-video':
          result = await uploadVideo(studentId, examId, fullRecording);
          console.log('Upload Video Result:', result);
          break;
        default:
          console.log("Invalid operation type.");
      }
      return result;
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setTimeout(async ()  => await client.close(), 6000)
    }
  }
};
