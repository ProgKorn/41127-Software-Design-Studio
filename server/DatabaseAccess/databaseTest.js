const { dbOp } = require('./databaseMaster.js');

// Test inserting documents
async function testInsert() {
  try {
    const documents = [{ name: "TESTAlice", age: 25 }, { name: "TESTBob", age: 30 }];
    await dbOp('insert', 'UserDetails', { docs: documents });
    console.log('Insert operation succeeded');
  } catch (error) {
    console.log('Insert operation failed:', error);
  }
}

// Test deleting documents
async function testDelete() {
  try {
    const query = { name: "TESTAlice" };
    await dbOp('delete', 'UserDetails', { query });
    console.log('Delete operation succeeded');
  } catch (error) {
    console.log('Delete operation failed:', error);
  }
}

// Test finding documents
async function testFind() {
  try {
    const query = { name: "TESTBob" };
    const result = await dbOp('find', 'UserDetails', { query });
    console.log('Find operation succeeded:', result);
  } catch (error) {
    console.log('Find operation failed:', error);
  }
}

// Test finding documents in ExamDetails
async function testExamFind() {
  try {
    const query = { examName: 'Maths' };
    const result = await dbOp('find', 'ExamDetails', { query });
    console.log('ExamFind operation succeeded:', result);
  } catch (error) {
    console.log('ExamFind operation failed:', error);
  }
}

// Test updating user details
async function testUpdateUser() {
  try {
    const email = "TESTBob@email.com";
    const updateDoc = { age: 31 };
    await dbOp('update-user', 'UserDetails', { email, updateDoc });
    console.log('UpdateUser operation succeeded');
  } catch (error) {
    console.log('UpdateUser operation failed:', error);
  }
}

// Test updating documents
async function testUpdateDoc() {
  try {
    const query = { name: "TESTBob" };
    const docs = { $set: { age: 32 } };
    await dbOp('update', 'UserDetails', { query, docs });
    console.log('UpdateDoc operation succeeded');
  } catch (error) {
    console.log('UpdateDoc operation failed:', error);
  }
}

// Additional Tests
async function testFindWithFilter() {
  try {
    const query = { age: { $gte: 30 } };
    const result = await dbOp('find', 'UserDetails', { query });
    console.log('Find operation with filters succeeded:', result);
  } catch (error) {
    console.log('Find operation with filters failed:', error);
  }
}

async function testDeleteByQuery() {
  try {
    const query = { age: { $gte: 30 } };
    await dbOp('delete', 'UserDetails', { query });
    console.log('Delete operation with query succeeded');
  } catch (error) {
    console.log('Delete operation with query failed:', error);
  }
}

async function testUpdateAdmin() {
  try {
    const query = { adminID: 123 };
    const docs = { $set: { classID: 144 } };
    await dbOp('update', 'Admin', { query, docs });
    console.log('UpdateAdmin operation succeeded');
  } catch (error) {
    console.log('UpdateAdmin operation failed:', error);
  }
}

async function testFindFlaggedIncidents() {
  try {
    const query = { flag: { $regex: 'YOLO', $options: 'i' } };
    const result = await dbOp('find', 'FlaggedIncidents', { query });
    console.log('FindFlaggedIncidents operation succeeded:', result);
  } catch (error) {
    console.log('FindFlaggedIncidents operation failed:', error);
  }
}

// Run all the test functions
async function runTests() {
  try {
    await testInsert();
    await testDelete();
    await testFind();
    await testExamFind();
    await testUpdateUser();
    await testUpdateDoc();
    await testFindWithFilter();
    await testDeleteByQuery();
    await testUpdateAdmin();
    await testFindFlaggedIncidents();
  } catch (error) {
    console.error('An error occurred during testing:', error);
  }
}

// Execute tests
runTests().catch(console.error);
