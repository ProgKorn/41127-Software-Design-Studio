//run me with -> node call.js

const { dbMaster } = require('./databaseMaster.js');

//dbMaster('find', 'StudentDetails', { studentId: 12345678 });
async function testFind() {
    await db.dbOp('find', 'ExamDetails', { query: { 'examName': 'Maths' } });
  }

//Tests
  async function runTests() {
    //await testInsert();
    await testFind();
    //await testUpdate();
    //await testDelete();
  }
  
  runTests().catch(console.error);
  
dbMaster('display');
