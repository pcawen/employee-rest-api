var express = require('express');
var app = express();

app.use(express.bodyParser());

//var employees = new Array();
var employees = [
	{id: 1, name: 'Alice', salary: 1500},
	{id: 2, name: 'Bob', salary: 2000},
	{id: 3, name: 'Carl', salary: 2500},
];

app.get('/', function(req, res){
	//res.type('text/plain');
	//res.send('There is nothing here!');
	//res.redirect('/employees');
	console.log(req.header('Accept'));
	console.log(req.header('Content-Type'));
	//in response set Content-Type
	res.type('text/plain');
	//res.type('application/json');
	//res.type('application/xml');
	res.send(400, 'Nothing here')
	
});

app.post('/employees', addEmployee);
app.get('/employees', findAll);
app.put('/employees', function(){res.send(501)});//updateAll - 501 Not Implemented
app.delete('/employees', function(){res.send(501)});//deleteAll - 501 Not Implemented
app.post('/employees/:id', function(){res.send(405)});//405 Method Not Allowed
app.get('/employees/:id', findById);
app.put('/employees/:id', updateEmployee);
app.delete('/employees/:id', deleteEmployee);

app.listen(3001);
console.log('Listening on port 3001');

function addEmployee(req, res){
	console.log("req: " + req.body);
	console.log("body: " + req);
	var employee = req.body;
	console.log('Adding employee: ' + JSON.stringify(employee));
	employees.push(employee);
	res.send(201, 'employee added');
}

function findAll(req, res){
	console.log('Retrieving all employees');
	res.json(employees);
}

function findById(req, res){
	var id = req.params.id;
    console.log('Retrieving employee: ' + id);
    var elemPos = indexOfEmployee(id);
    if(elemPos >= 0){
    	res.json(employees[elemPos]);
    }else{
    	res.send(404, 'Employee not found'); //Or should be 204
    }
}

function updateEmployee(req, res){
	var id = req.params.id;
	var elemPos = indexOfEmployee(id);
	if(elemPos >= 0){
    	employees.splice(elemPos,1);
    	employees.push(employee);
    }else{
    	res.send(404, 'Employee not found'); //Or should be 204
    }
}

function deleteEmployee(req, res){
	var id = req.params.id;
    console.log('Deleting employee: ' + id);
    var elemPos = indexOfEmployee(id);
	if(elemPos >= 0){
    	employees.splice(elemPos,1);
    	res.send(204, 'Succesully deleted');
    }else{
    	res.send(404, 'Employee not found'); //Or should be 204
    }
}

function indexOfEmployee(id){
	for(var i = 0; i < employees.length; i++){
    	if(employees[i].id == id){
    		return i;
    	}
    }
    return -1;
}

//function Employee(id, name, salary){
//}


//HTTP accept y content-type: json, xml