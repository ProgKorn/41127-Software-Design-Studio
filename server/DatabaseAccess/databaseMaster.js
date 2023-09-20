const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);
const bcrypt = require('bcrypt');

// for inserting new data
async function insertDoc(collType, docs) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection(collType);
  return await coll.insertMany(docs);
}

// for deleting students
async function deleteDoc(collType, query) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection(collType);
  return await coll.deleteMany({ query });
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

async function findDoc(collType, query) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection(collType);
  const cursor = coll.find(query);
  const results = [];
  await cursor.forEach(doc => results.push(doc));
  return results;
}

async function updateDoc(collType, query, docs) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection(collType);
  return await coll.updateMany(query, docs);
}

module.exports = {
  // master function (entry represents the details)
  dbOp: async function (operationType, collType, entry) {
    await client.connect();
    let result;
    try {
      const { query, docs, email, updateDoc } = entry; // Extract data from the entry object
      switch (operationType) {
        
        //Example usage:
        // dbOp('insert', 'StudentDetails, [{ /* your document here */ }]
        case 'insert':
          result = await insertDoc(collType, docs);
          //returns number of inserted documents
          console.log("Inserted documents:", result.insertedIds);
          //returns details of inserted documents
          result.ops.forEach((doc, index) => {
            console.log(`Document ${index + 1}:`, doc);
          });
          break;

        // Example usage:
        // dbOp('delete', 'UserDetails, {email: 'steve@musk.com})
        case 'delete':
          result = await deleteDoc(collType, query);
          console.log("Deleted count:", result.deletedCount);
          break;

        // Example usage:
        // // dbOp('find', 'ExamDetails', { query: { time: '10:00' } })
        case 'find':
          result = await findDoc(collType, entry.query);
          console.log("Found documents:", result);
          return result;

        // Example usage:
        // dbOp('update', { studentId : 12345678, updateDoc: { seatNumber : 200 }})
        case 'update-user':
          result = await updateUser(entry.email, entry.updateDoc);
          console.log("Updated count:", result.modifiedCount);
          break;


        // Example usage:
        // dbOp('update', { studentId : 12345678, updateDoc: { seatNumber : 200 }})
        case 'update':
          result = await updateDoc(collType, query, docs);
          console.log("Update:", result.modifiedCount);
          break;
        default:
          console.log("Invalid operation type.");
      }

    } finally {
      await client.close();
    }
  }

};
