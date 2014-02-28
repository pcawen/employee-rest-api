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
	res.send(404, 'File not found')
	//res.redirect('/employees');
});

app.post('/employees', addEmployee);
app.get('/employees', findAll);
//app.put('/employees', updateAll);//501
//app.delete('/employees', deleteAll);

//app.post('/employees/:id', error);
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
	res.send('employee added');// TODO add error code
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
    	res.send(404, 'File not found'); //TODO Put proper error code
    }
}

function updateEmployee(req, res){
	var id = req.params.id;
	var elemPos = indexOfEmployee(id);
	if(elemPos >= 0){
    	employees.splice(elemPos,1);
    	employees.push(employee);
    }else{
    	res.send(404, 'File not found'); //TODO Put proper error code
    }
}

function deleteEmployee(req, res){
	var id = req.params.id;
    console.log('Deleting employee: ' + id);
    var elemPos = indexOfEmployee(id);
	if(elemPos >= 0){
    	employees.splice(elemPos,1);
    }else{
    	res.send(404, 'File not found'); //TODO Put proper error code
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