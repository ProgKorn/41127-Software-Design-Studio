
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Amy:amy@proctordb.ifkuafa.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("SoftwareDesignStudio");
    const coll = db.collection("StudentDetails");

    // update code goes here

    // student number goes here
    const filter = {studentId : 12345678 };

    // field changes go here
    const updateDoc = {
      $set: { seatNumber : 200 }
    };
  
  // update code for documents that match a filter
  const result = await coll.updateMany(filter, updateDoc);

    // display the results of your operation
    console.log("Number of documents updated: " + result.modifiedCount);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
