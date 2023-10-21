const { MongoClient } = require('mongodb');
const fs = require('fs'); // I noticed that you are using fs but did not require it.
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);

async function downloadVideo(studentId, examId) {
  console.log(`Trying to fetch video for studentId: ${studentId}, examId: ${examId}`);

  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection("Exam-Student");

  // Use the variables studentId and examId for the query
  const query = { studentId, examId };

  console.log("Query:", query);

  const doc = await coll.findOne(query);
  console.log("Document fetched: ", doc);

  if (!doc || !doc.fullRecording) {
    console.error("Document or binary data not found.");
    return null;
  }

  // Convert MongoDB Binary to Node.js Buffer
  const buffer = doc.fullRecording.buffer;

  // Optional: Save to file system for verification
  fs.writeFileSync('output.webm', buffer);

  return buffer;
}

(async () => {
  await client.connect();
  const studentId = 42345678;  // Use numbers, not strings
  const examId = 1;  // Use numbers, not strings

  const buffer = await downloadVideo(studentId, examId);
  if (buffer) {
    console.log('Video downloaded successfully.');
  } else {
    console.log('Video could not be downloaded.');
  }

  await client.close();
})();
