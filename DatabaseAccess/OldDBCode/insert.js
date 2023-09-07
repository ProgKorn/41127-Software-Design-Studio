
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

    // insert code goes here
    const docs = [
      {
        "name": {
          "firstName": "Will",
          "lastName": "Wan"
        },
        "studentId": 88888888,
        "seatNumber": 8,
        "faceImageUrl": "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201011/20101123131216-1_0.jpg?itok=ma_P1FSF"
      }
    ];

    // iterate code goes here
    const result = await coll.insertMany(docs);

    // display the results of your operation
    console.log(result.insertedIds);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
