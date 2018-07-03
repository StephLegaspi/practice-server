'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/find-all', controller.getAllStudents);
router.get('/find-student/:stud_no', controller.findStudentbyStudno);
router.delete('/delete-student/:stud_no', controller.deleteStudent);
router.post('/add-student', controller.addStudent);
router.put('/update-student', controller.updateStudent);

//USES PROMISE
router.get('/find', function (req, res){
	var users = controller.findall();
	users.then(function(result){
		res.json(result);
	}).catch(function(err){
		res.json(err);
	});
	
});

router.get('/find-one/:stud_no', function (req, res){
	var users = controller.findStudent(req.params.stud_no);
	users.then(function(result){
		res.json(result);
	}).catch(function(err){
		res.json(err);
	});
	
});

router.post('/add-user', function (req, res){
	var username = req.query.username;
	var password = req.query.password;

	var users = controller.addUser(username, password);
	users.then(function(result){
		res.json(result);
	}).catch(function(err){
		res.json(err);
	});

});

router.post('/login', function (req, res){
	var username = req.query.username;
	var password = req.query.password;

	var users = controller.login(username, password);
	req.session.user = users;
	users.then(function(result){
		console.log("Successfully logged in!");
		res.json(result);
	}).catch(function(err){
		res.json(err);
	});

});

router.post('/logout', (req, res) => {
  req.session.user = null;
  res.status(200).json({
    status: 200,
    message: 'Successfully logged out'
  });
});

router.post('/session', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully fetched current session',
    data: req.session.user
  });
});


module.exports = router;