const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Amy:amy@proctordb.ifkuafa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// for inserting new students
async function insertStudent(docs) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("UserDetails");
  return await coll.insertMany(docs);
}

// for deleting students
async function deleteStudent(email) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("UserDetails");
  return await coll.deleteMany({ email });
}

async function findStudent(email, password) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("UserDetails");
  const cursor = coll.find({ email, password });
  const results = [];
  await cursor.forEach(doc => results.push(doc));
  return results;
}

async function updateStudent(email, updateDoc) {
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("UserDetails");
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
          result = await insertStudent(entry);
          console.log("Inserted IDs:", result.insertedIds);
          break;

        // Example usage:
        // dbOp('delete', 12345678)
        case 'delete':
          result = await deleteStudent(entry);
          console.log("Deleted count:", result.deletedCount);
          break;

        // Example usage:
        // // dbOp('find', 12345678)
        case 'find':
          result = await findStudent(entry.email, entry.password);
          console.log("Found documents:", result);
          return result;

        // Example usage:
        // dbOp('update', { studentId : 12345678, updateDoc: { seatNumber : 200 }})
        case 'update':
          result = await updateStudent(entry.email, entry.updateDoc);
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
