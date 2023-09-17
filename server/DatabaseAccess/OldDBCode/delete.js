
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

    // delete code goes here
    const query =
      {
        studentId : 88888888
      };

    // iterate code goes here
    const result = await coll.deleteMany(query);

    // display the results of your operation
    console.log(result.deletedCount);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
