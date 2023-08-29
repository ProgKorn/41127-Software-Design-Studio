const { dbOp } = require('./databaseMaster.js');

dbOp('find', 12345678).catch(err => {
  console.log('Error:', err);
});
