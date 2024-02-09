# CarCar

Team:

* Person 1 - Ralphy Service
* Person 2 - Martin Sales

## Design

## Service microservice
![ReadMe Diagram](image.png)

Explain your models and integration with the inventory
microservice, here.

Step: 1 fork and clone repository

Step:2 Add partner to gitlab as a Maintainer

Step:3 Create a front end for inventory views

Step:4 Create Models and Views that connect to the CRUD api endpoints for Technicians and Appointments

Step: 5 Create Frontend using React to grab from the API endpoints and to be able to create for each respective category both in inventory and services.

Step: 6 Create a frontend using React to get a list of data within each specified webpage tha will return a list of items from the CRUD api endpoints.

Port: 3000:3000
This runs a Reac application and maps container to port 3000 and is accessed through localhost:3000

Port: 8100:8000
This hosts an inventory API. This port is mapped to port 8100 making it accessible to 8100 through http://localhost:8100

Port: 8080:8000
This service runs an service related API. This is accessable on port 8080.

![CRUD Route Documentation ](image-1.png)

Service Microservice

```
Technicians

List View:
GET localhost:8080/api/technicians/
Example:

"technicians": [
		{
			"id": 1,
			"first_name": "John",
			"last_name": "Doe",
			"employee_id": "T12345"
		},
		{
			"id": 2,
			"first_name": "Joe",
			"last_name": "Random",
			"employee_id": "T2468"
		}
]
Create: POST localhost:8080/api/technicians/
Example:
 {{
	"first_name": "Joe",
	"last_name": "Random",
	"employee_id": "T2433"
}}
```
```
Service Appointments

List: GET localhost:8080/api/appointments/
Example:
{
	"appointments": [
		{
			"id": 9,
			"date_time": "2024-02-01T11:34:00+00:00",
			"reason": "Need to Check",
			"status": "finished",
			"vin": "1B7GG42X92S573286",
			"customer": "Joe Randomly",
			"technician": {
				"id": 4,
				"first_name": "Ralphy",
				"last_name": "sadsad",
				"employee_id": "T0924312"
			}
		},
		{
			"id": 8,
			"date_time": "2024-02-23T11:26:00+00:00",
			"reason": "Oil Change",
			"status": "finished",
			"vin": "1B7GG42X92S573286",
			"customer": "Joe Randomly",
			"technician": {
				"id": 1,
				"first_name": "John",
				"last_name": "Doe",
				"employee_id": "T12345"
			}
        }
]
}
```
```
Create: POST http://localhost:8080/api/appointments/
Example:
{
  "date_time": "2024-04-20 14:00:00Z",
  "reason": "Routine Maintenance",
  "status": "scheduled",
  "vin": "1C3CC26B2AN120174",
  "customer": "Jawn Doe",
  "technician_id": "2"
}
```

```
Manufacturers API

List Manufacturers

Method: GET
URL: http://localhost:8100/api/manufacturers/
Example Response:
json
Copy code
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```
```
Create a Manufacturer

Method: POST
URL: http://localhost:8100/api/manufacturers/
Example Request Body:
json
Copy code
{
  "name": "Chrysler"
}
Example Response:
json
Copy code
{
  "href": "/api/manufacturers/2/",
  "id": 2,
  "name": "Chrysler"
}
```
```
Get a Specific Manufacturer

Method: GET
URL: http://localhost:8100/api/manufacturers/:id/
Example Response:
json
Copy code
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Daimler-Chrysler"
}
```
```
Update a Specific Manufacturer

Method: PUT
URL: http://localhost:8100/api/manufacturers/:id/
Example Request Body:
json
Copy code
{
  "name": "Updated Chrysler"
}
```
```
Delete a Specific Manufacturer

Method: DELETE
URL: http://localhost:8100/api/manufacturers/:id/
```
Vehicle Models API
```
List Vehicle Models

Method: GET
URL: http://localhost:8100/api/models/
Example Response:
json
Copy code
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://example.com/sebring.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```
```
Create a Vehicle Model

Method: POST
URL: http://localhost:8100/api/models/
Example Request Body:
json
Copy code
{
  "name": "Pacifica",
  "picture_url": "https://example.com/pacifica.jpg",
  "manufacturer_id": 2
}
```
```
Get a Specific Vehicle Model

Method: GET
URL: http://localhost:8100/api/models/:id/
Example Response:
json
Copy code
{
  "href": "/api/models/2/",
  "id": 2,
  "name": "Pacifica",
  "picture_url": "https://example.com/pacifica.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/2/",
    "id": 2,
    "name": "Chrysler"
  }
}
```
```
Update a Specific Vehicle Model

Method: PUT
URL: http://localhost:8100/api/models/:id/
Example Request Body:
json
Copy code
{
  "name": "Updated Pacifica",
  "picture_url": "https://example.com/updated_pacifica.jpg"
}
```
```
Delete a Specific Vehicle Model

Method: DELETE
URL: http://localhost:8100/api/models/:id/
Automobiles API
List Automobiles
```
```
Method: GET
URL: http://localhost:8100/api/automobiles/
Example Response:
json
Copy code
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "red",
      "year": 2012,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://example.com/sebring.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": true
    }
  ]
}
```
```
Create an Automobile

Method: POST
URL: http://localhost:8100/api/automobiles/
Example Request Body:
json
Copy code
{
  "color": "blue",
  "year": 2014,
  "vin": "2FMDK3JC5ABA12345",
  "model_id": 2,
  "sold": false
}
```
```
Get a Specific Automobile

Method: GET
URL: http://localhost:8100/api/automobiles/:vin/
Example Response:
json
Copy code
{
  "href": "/api/automobiles/2FMDK3JC5ABA12345/",
  "id": 2,
  "color": "blue",
  "year": 2014,
  "vin": "2FMDK3JC5ABA12345",
  "model": {
    "href": "/api/models/2/",
    "id": 2,
    "name": "Pacifica",
    "picture_url": "https://example.com/pacifica.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/2/",
      "id": 2,
      "name": "Chrysler"
    }
  },
  "sold": false
}
```
```
Update a Specific Automobile

Method: PUT
URL: http://localhost:8100/api/automobiles/:vin/
Example Request Body:
json
Copy code
{
  "color": "green",
  "year": 2015,
  "sold": true
}
```
```
Delete a Specific Automobile

Method: DELETE
URL: http://localhost:8100/api/automobiles/:vin/
```
## Sales microservice

Explain your models and integration with the inventory
microservice, here.
