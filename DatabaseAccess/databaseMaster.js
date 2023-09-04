const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Amy:amy@proctordb.ifkuafa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function generalAction(collection, actionType, field) {
  const db = client.db("SoftwareDesignStudio");
  let result;
    //dbMaster('insert', 'SomeCollection', [{ /* your document here */ }]);
    //dbMaster('delete', 'SomeCollection', { field: 'value' });
    //dbMaster('find', 'SomeCollection', { field: 'value' });
    //dbMaster('update', 'SomeCollection', { query: { field: 'value' }, updateDoc: { field: 'newValue' } });
    //dbMaster('display');
  switch (actionType) {
    case 'insert':
      const collInsert = db.collection(collection);
      result = await collInsert.insertMany(field);
      console.log("Inserted IDs:", result.insertedIds);
      return result.insertedIds;
      
    case 'delete':
      const collDelete = db.collection(collection);
      result = await collDelete.deleteMany(field);
      console.log("Deleted count:", result.deletedCount);
      return result.deletedCount;
      
    case 'find':
      const collFind = db.collection(collection);
      const cursor = collFind.find(field);
      const results = [];
      await cursor.forEach(doc => results.push(doc));
      console.log("Found documents:", results);
      return results;
      
    case 'update':
      const collUpdate = db.collection(collection);
      result = await collUpdate.updateMany(field.query, { $set: field.updateDoc });
      console.log("Updated count:", result.modifiedCount);
      return result.modifiedCount;
      
    case 'display':
      const collections = await db.listCollections().toArray();
      console.log(`Database: SoftwareDesignStudio`);
      for (const collectionObj of collections) {
        console.log(` Collection: ${collectionObj.name}`);
        const doc = await db.collection(collectionObj.name).findOne({}, { projection: {_id: 0} });
        if (doc) {
          console.log('  Fields:', Object.keys(doc).join(', '));
        } else {
          console.log('  Nothing to display.');
        }
      }
      break;
      
    default:
      console.log("Invalid operation type.");
      return null;
  }
}


module.exports = {
  dbMaster: async function (operationType, collection, field) {
    await client.connect();
    try {
      return await generalAction(collection, operationType, field);
    } finally {
      await client.close();
    }
  }
};
