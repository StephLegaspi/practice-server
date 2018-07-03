DROP USER IF EXISTS 'studentserver'@'localhost';
CREATE USER 'studentserver'@'localhost' IDENTIFIED BY 'studentserver';

DROP DATABASE IF EXISTS studentserver;
CREATE DATABASE studentserver;

GRANT ALL PRIVILEGES ON studentserver.* TO 'studentserver'@'localhost';
GRANT EXECUTE ON studentserver.* TO 'studentserver'@'localhost';

USE studentserver;

CREATE TABLE student (
    stud_no INT NOT NULL PRIMARY KEY, 
    name VARCHAR(10) NOT NULL,
    age INT NOT NULL,
    course VARCHAR(10) NOT NULL,
    college VARCHAR(10) NOT NULL
);

CREATE TABLE user (
	username VARCHAR(64),
	password VARCHAR(64)
);

/*PROCEDURES FOR STUDENT*/
DROP PROCEDURE IF EXISTS view_student;
DROP PROCEDURE IF EXISTS insert_student;
DROP PROCEDURE IF EXISTS delete_student;
DROP PROCEDURE IF EXISTS update_student;

DELIMITER GO

CREATE PROCEDURE view_student()
BEGIN
	SELECT * FROM student;
END;
GO

CREATE PROCEDURE insert_student(stud_no int,
								name varchar(10),
								age int,
								course varchar(10),
								college varchar(10))
BEGIN
	INSERT INTO student
		values (stud_no, name, age, course, college);
END;
GO

CREATE PROCEDURE delete_student(stud_no int)
BEGIN
	DELETE FROM student
		where stud_no = stud_no;
END;
GO

CREATE PROCEDURE update_student(stud_no int,
								name varchar(10),
								age int,
								course varchar(10),
								college varchar(10))
BEGIN
	UPDATE student
		SET name=name, age=age, course=course, college=college
		where stud_no = stud_no;
END;
GO

DELIMITER ;

call insert_student(201512345, "cheska", 19, "bscs", "cas");
call insert_student(201500649, "steph", 18, "bscs", "cas");
call insert_student(201554321, "legaspi", 17, "bsn", "che");
call insert_student(201554300, "trizia", 20, "bsce", "ceat");
