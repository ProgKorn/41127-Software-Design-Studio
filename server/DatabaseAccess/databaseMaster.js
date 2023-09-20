const { MongoClient } = require('mongodb');
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

async function updateDocument(collType, query, docs) {  // Renamed to updateDocument
  const db = client.db("SoftwareDesignStudio");
  const coll = db.collection(collType);
  return await coll.updateMany(query, docs);
}

module.exports = {
  dbOp: async function (operationType, collType, entry) {
    await client.connect();
    let result;
    try {
      const { query, docs, email, updateDoc } = entry;
      switch (operationType) {
        case 'insert':
          result = await insertDoc(collType, docs);
          break;
        case 'delete':
          result = await deleteDoc(collType, query);
          break;
        case 'find':
          result = await findDoc(collType, query);
          return result;
        case 'update-user':
          result = await updateUser(email, updateDoc);
          break;
        case 'update':
          result = await updateDocument(collType, query, docs); // Renamed to updateDocument
          break;
        default:
          console.log("Invalid operation type.");
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      await client.close();
    }
  }
};
