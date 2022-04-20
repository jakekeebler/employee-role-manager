-- CREATE DATABASE (short for "employee manager database")
DROP DATABASE IF EXISTS em_db;

CREATE DATABASE em_db;

USE em_db;

-- DEPARTMENT TABLE
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 
);
-- ROLE TABLE
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
-- EMPLOYEE TABLE
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- DEPARTMENT SEEDS
INSERT INTO department (name)
VALUE ("Art");
INSERT INTO department (name)
VALUE ("Design");
INSERT INTO department (name)
VALUE ("Distribution");
INSERT INTO department (name)
VALUE ("Legal");
INSERT INTO department (name)
VALUE ("Marketing");
INSERT INTO department (name)
VALUE ("Production");
INSERT INTO department (name)
VALUE ("Programming");

-- ROLE SEEDS
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Artist", 130000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("3D Artist", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Concept Artist", 75000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Game Designer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Game Designer", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Distribution Manager", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 100000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Media Marketing Manager", 115000, 5);
INSERT INTO role (title, salary, department_id)
VALUE ("Media Marketing Associate", 55000, 5);
INSERT INTO role (title, salary, department_id)
VALUE ("Video Game Producer", 95000, 6);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Game Programmer", 95000, 7);
INSERT INTO role (title, salary, department_id)
VALUE ("Game Programmer", 75000, 7);

-- EMPLOYEE SEEDS
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Eva-Rose", "Dawn", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ashley", "Maldonado", 1, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Musab","Powell", 1, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jordan", "Knight", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Essa", "Fletcher", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Conall", "Salazar", null, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Billy-Joe", "Miller", null, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jasmin", "Larson", null, 8);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tyler", "Key", 8, 9);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jodi", "Delgado", null, 10);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lisa", "Cline", null, 11);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Justin", "Stevens", 11, 12);

-- SHOW THE DATA
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
