// Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table')

// creates connection to sql database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sqlaccess',
  database: 'em_db'
})

// connects to sql server and sql database
db.connect(function (err) {
  if (err) throw err;
  options();
})

// prompts user with list of options to choose from
function options() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'Welcome to our employee database! What would you like to do?',
      choices: [
        'View all employees',
        'View all departments',
        'View all roles',
        'Add an employee',
        'Add a department',
        'Add a role',
        'Update employee role',
        'EXIT'
      ]
    }).then(function (answer) {
      switch (answer.action) {
        case 'View all employees':
          viewEmployees();
          break;
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Update employee role':
          updateEmployee();
          break;
        case 'EXIT':
          exitApp();
          break;
        default:
          break;
      }
    })
};

// view all employees in the database
function viewEmployees() {
  var query = `SELECT employee.id, 
  employee.first_name, 
  employee.last_name, 
  role.title, 
  department.name AS department,
  role.salary, 
  CONCAT (manager.first_name, " ", manager.last_name) AS manager,
  employee.manager_id
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  db.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + ' employees found!');
    console.table('All Employees:', res);
    options();
  })
};

// view all departments in the database
function viewDepartments() {
  var query = 'SELECT * FROM department';
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table('All Departments:', res);
    options();
  })
};

// view all roles in the database
function viewRoles() {
  var query = "SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table('All Roles:', res);
    options();
  })
};


// add an employee to the database
function addEmployee() {
  db.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'first_name',
          type: 'input',
          message: "What is the employee's first name? ",
        },
        {
          name: 'last_name',
          type: 'input',
          message: "What is the employee's last name? "
        },
        {
          name: 'manager_id',
          type: 'input',
          message: "What is the employee's manager's ID? "
        },
        {
          name: 'role',
          type: 'list',
          choices: function () {
            var roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is this employee's role? "
        }
      ]).then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == answer.role) {
            role_id = res[a].id;
            console.log(role_id)
          }
        }
        db.query(
          'INSERT INTO employee SET ?',
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: answer.manager_id,
            role_id: role_id,
          },
          function (err) {
            if (err) throw err;
            console.log('Your employee has been added!');
            options();
          })
      })
  })
};

// add a department to the database
function addDepartment() {
  inquirer
    .prompt([
      {
        name: 'newDepartment',
        type: 'input',
        message: 'Which department would you like to add?'
      }
    ]).then(function (answer) {
      db.query(
        'INSERT INTO department SET ?',
        {
          name: answer.newDepartment
        });
      var query = 'SELECT * FROM department';
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log('Your department has been added!');
        options();
      })
    })
};

// add a role to the database
function addRole() {
  db.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: 'new_role',
          type: 'input',
          message: "What new role would you like to add?"
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary of this role? (Enter a number)'
        },
        {
          name: 'Department',
          type: 'list',
          choices: function () {
            var deptArry = [];
            for (let i = 0; i < res.length; i++) {
              deptArry.push(res[i].name);
            }
            return deptArry;
          },
        }
      ]).then(function (answer) {
        let department_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].name == answer.Department) {
            department_id = res[a].id;
          }
        }

        db.query(
          'INSERT INTO role SET ?',
          {
            title: answer.new_role,
            salary: answer.salary,
            department_id: department_id
          },
          function (err, res) {
            if (err) throw err;
            console.log('Your new role has been added!');
            options();
          })
      })
  })
};

// update a role in the database
function updateEmployee() {
  db.query(`SELECT * FROM employee`, (err, data) => {
    if (err) throw err; 

  const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = []; 
        params.push(employee);

        db.query(`SELECT * FROM role`, (err, data) => {
          if (err) throw err;

          const roles = data.map(({ id, title }) => ({ name: title, value: id }));
          
            inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's new role?",
                choices: roles
              }
            ])
                .then(roleChoice => {
                const role = roleChoice.role;
                params.push(role); 
                
                let employee = params[0]
                params[0] = role
                params[1] = employee 

                const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                db.query(sql, params, (err, result) => {
                  if (err) throw err;
                console.log("Employee has been updated!");
                options();
          });
        });
      });
    });
  });
};

// exit the app
function exitApp() {
  db.end();
};