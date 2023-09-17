const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);
const bcrypt = require('bcrypt');

// for inserting new students
async function insertUser(docs) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("UserDetails");
  return await coll.insertMany(docs);
}

// for deleting students
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
  // Since we do not have a user registration page, this logic handles the password hashing.
  if (updateDoc.password) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(updateDoc.password, saltRounds);
    updateDoc.password = hashedPassword;
  }
  return await coll.updateMany({ email }, { $set: updateDoc });
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
        case 'insert':
          result = await insertUser(entry);
          console.log("Inserted IDs:", result.insertedIds);
          break;

        // Example usage:
        // dbOp('delete', 12345678)
        case 'delete':
          result = await deleteUser(entry);
          console.log("Deleted count:", result.deletedCount);
          break;

        // Example usage:
        // // dbOp('find', 12345678)
        case 'find':
          result = await findUser(entry.email);
          console.log("Found documents:", result);
          return result;

        // Example usage:
        // dbOp('update', { studentId : 12345678, updateDoc: { seatNumber : 200 }})
        case 'update':
          result = await updateUser(entry.email, entry.updateDoc);
          console.log("Updated count:", result.modifiedCount);
          break;
        default:
          console.log("Invalid operation type.");
      }

    } finally {
      await client.close();
    }
  }

};

