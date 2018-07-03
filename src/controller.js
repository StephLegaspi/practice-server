const db = require('./database/index');

const bcrypt = require('bcryptjs');
const fs = require('fs');
const salt = bcrypt.genSaltSync(10);

exports.login = ( username, password ) => {
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * from user where username = '" + username+"'";
    db.query(queryString, username, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      bcrypt.compare(password, rows[0].password, (error, isMatch) => {
        if (error) return reject(500);
        else if (!isMatch){
        	console.log(rows[0].password);
        	return reject(401);
        } 
        
        return resolve(rows[0]);
      });
    });
  });
};

exports.addUser = ( username, password ) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function(err, hash) {
      const queryString = "INSERT INTO user VALUES ('" + username+"', '" +hash+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
  });
};

exports.findall = () => {
	return new Promise((resolve, reject) => {
	    const queryString = `
	        SELECT
	          *
	        FROM
	          student;
	      `;

	    db.query(queryString, (err, rows) => {
	      if (err) {
	      	return reject(500);
	      }
	      return resolve(rows);
	      
	    });
	});
};

exports.findStudent = (stud_no) =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT * FROM student WHERE stud_no = '" + stud_no+"';"

		db.query(queryString, (err, rows) =>{
			
			if (err){
				return reject(500);
			}
			if (!rows.length){
				return reject(404);
			}
			return resolve(rows);
		});
	});
};

exports.getAllStudents = (req, res) => {
  	db.query("SELECT * FROM student;", function(err, rows) {
	        if (!err && rows.length > 0) {
	            res.json(rows);
	        } else {
	            res.json([]);
	        }
	});
}

exports.findStudentbyStudno = (req, res) => {
	var stud_no = req.params.stud_no;
  	db.query("SELECT * FROM student WHERE stud_no = '" + stud_no+"';", function(err, rows) {
  			if(err){
	        	res.json([]);
	        	console.log("Error");
	        }
	        if (!err && rows.length > 0) {
	            res.json(rows);
	            console.log("Student found!");
	        }else if(!rows.length) {
	            res.json([]);
	            console.log("Student not found!");
	        }
	});
}

exports.deleteStudent = (req, res) => {
	var stud_no = req.params.stud_no;
  	db.query("DELETE FROM student WHERE stud_no = '" + stud_no+"';", function(err, rows) {
	        if (!err) {
	            res.json(rows);
	            console.log("Student deleted!");
	        } else {
	            res.json([]);
	            console.log("Student not deleted!");
	        }
	});
}

exports.addStudent = (req, res) => {
	var postQuery = req.query;
	var stud_no = postQuery.stud_no;
	var name = postQuery.name;
	var age = postQuery.age;
	var course = postQuery.course;
	var college = postQuery.college;
  	db.query("INSERT INTO student VALUES( '" + stud_no+"', '" + name+"', '" + age+"', '" + course+"', '" + college+"');", function(err, rows) {
	        if (!err) {
	            res.json(rows);
	            console.log("Student added!");
	        } else {
	            res.json([]);
	            console.log("Student not added!");
	        }
	});
}

exports.updateStudent = (req, res) => {
	var postQuery = req.query;
	var stud_no = postQuery.stud_no;
	var name = postQuery.name;
	var age = postQuery.age;
	var course = postQuery.course;
	var college = postQuery.college;
  	db.query("UPDATE student SET stud_no = '" + stud_no+"', name = '" + name+"', age = '" + age+"', course = '" + course+"', college = '" + college+"' WHERE stud_no = '" + stud_no+"';", function(err, rows) {
	        if (!err) {
	            res.json(rows);
	            console.log("Student updated!");
	        } else {
	            res.json([]);
	            console.log("Student not updated!");
	        }
	});
}