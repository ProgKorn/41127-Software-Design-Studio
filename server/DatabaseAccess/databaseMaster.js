const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Amy:amy@proctordb.ifkuafa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

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
    try {
      let result;
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
