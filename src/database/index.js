const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'studentserver',
  password: 'studentserver',
  db: 'studentserver',
  multipleStatements: true
});

db.on('ready', () => console.log('Database is connected')).on('error', err => {
  console.log('Error in connecting to database');
  console.log(err.message);
});

db.connect(err => {
  if (err) {
    console.log('Error in connecting to database');
    console.log(err.message);
  } else {
    console.log('Success in connecting to database');
  }
});
db.query('USE studentserver');

module.exports = db;