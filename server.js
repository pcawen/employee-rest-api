var express = require('express');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray: false, explicitRoot: false});
var app = express();

//instead of use bodyParser(Read raw data). Needed to read xml format
app.use(function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
});

var employees = [
	{id: 1, name: 'Alice', salary: 1500},
	{id: 2, name: 'Bob', salary: 2000},
	{id: 3, name: 'Carl', salary: 2500},
];

app.get('/', function(req, res){
	//res.redirect('/employees');
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

app.listen(3000);
console.log('Listening on port 3000');

function addEmployee(req, res){
	console.log("req: " + req.body);
	console.log("body: " + req);
	var conttyp = req.header('Content-Type');
	console.log('content-type' + conttyp);
	if(conttyp == 'application/json'){
		var employee = JSON.parse(req.rawBody);
		console.log('Adding employee: ' + JSON.stringify(employee));
		employees.push(employee);
		res.send(201, 'employee added');
	}else{
		var xmlemployee = req.rawBody;
		console.log('Adding employee: ' + xmlemployee);
		parser.parseString(xmlemployee, function (err, result) {
		    employees.push(result);
		});
		res.send(201, 'employee added');
	}
}

function findAll(req, res){
	console.log('Retrieving all employees');
	var accept = req.header('Accept');
	if(accept == 'json'){
		console.log('returning json');
		res.json(employees);
	}else if(accept == 'xml'){
		console.log('returning xml');
		var builder = new xml2js.Builder({rootName: 'employees'});
		var xml = builder.buildObject(employees);
		res.send(xml);
	}else{
		res.send(406);//Not Acceptable. Only capable of generating content not acceptable according to the Accept headers
	}
}

function findById(req, res){
	var id = req.params.id;
	var accept = req.header('Accept');
    console.log('Retrieving employee: ' + id);
    var elemPos = indexOfEmployee(id);
    if(elemPos >= 0){
    	if(accept == 'json'){
    		res.json(employees[elemPos]);
    	}else if(accept == 'xml'){
			var builder = new xml2js.Builder({rootName: 'employee'});
			var xml = builder.buildObject(employees[elemPos]);
			res.send(xml);
    	}else{
			res.send(406);//Not Acceptable. Only capable of generating content not acceptable according to the Accept headers
		}
    }else{
    	res.send(404, 'Employee not found'); //Or should be 204
    }
}

function updateEmployee(req, res){
	var id = req.params.id;
	var employee = null;
	var conttyp = req.header('Content-Type');
	console.log('Updting employee: ' + id);
	var elemPos = indexOfEmployee(id);
	if(conttyp == 'application/json'){
		employee = JSON.parse(req.rawBody);
	}else{
		var xmlemployee = req.rawBody;
		parser.parseString(xmlemployee, function (err, result) {
		    employee = result;
		});
	}
	if(elemPos >= 0){
		console.log('Updating employee' + employee);
    	employees.splice(elemPos,1);
    	employees.push(employee);
    	res.send(201, 'employee updated');
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