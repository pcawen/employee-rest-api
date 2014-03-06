employee-rest-api
=================

A simple REST api using nodejs and express


To test it, you can use CURL or a Chrome plugin like "REST Console" or POSTMAN

-LIST
http://localhost:3000/employees/
GET
Accept: xml, json

--Get by ID
http://localhost:3000/employees/6
GET
Accept: xml, json

--ADD
http://localhost:3000/employees/
POST

Content-Type: application/xml
<employee>
    <id>4</id>
    <name>Dilan</name>
    <salary>4000</salary>
</employee>

Content-Type: application/json    
{"id": "5", "name":"Dilan", "salary": "3500"}

--UPDATE
http://localhost:3001/employees/4
PUT

Content-Type: application/xml
<employee>
    <id>4</id>
    <name>Duran</name>
    <salary>4000</salary>
</employee>

Content-Type: application/json
{"id": "4", "name":"Duran", "salary": "6500"}

--DELETE
http://localhost:3000/employees/2
DELETE
