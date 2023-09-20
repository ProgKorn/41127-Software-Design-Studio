const { dbOp } = require('./databaseMaster.js');

async function testInsert() {
  try {
    const documents = [{ name: "TESTAlice", age: 25 }, { name: "TESTBob", age: 30 }];
    await dbOp('insert', 'UserDetails', { docs: documents });
    console.log('Insert operation succeeded');
  } catch (error) {
    console.log('Insert operation failed:', error);
  }
}

async function testDelete() {
  try {
    const query = { name: "TESTAlice" };
    await dbOp('delete', 'UserDetails', { query });
    console.log('Delete operation succeeded');
  } catch (error) {
    console.log('Delete operation failed:', error);
  }
}

async function testFind() {
  try {
    const query = { name: "TESTBob" };
    const result = await dbOp('find', 'UserDetails', { query });
    console.log('Find operation succeeded:', result);
  } catch (error) {
    console.log('Find operation failed:', error);
  }
}

async function testExamFind() {
  try {
    const query = { examName: 'Maths' };
    const result = await dbOp('find', 'ExamDetails', { query });
    console.log('ExamFind operation succeeded:', result);
  } catch (error) {
    console.log('ExamFind operation failed:', error);
  }
}

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

async function runTests() {
  try {
    await testInsert();
    await testDelete();
    await testFind();
    await testExamFind();
    await testUpdateUser();
    await testUpdateDoc();
  } catch (error) {
    console.error('An error occurred during testing:', error);
  }
}

runTests().catch(console.error);
