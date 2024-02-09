# CarCar

Team:

* Person 1 - Ralphy Service
* Person 2 - Martin Maldonado Auto Sales

## Design
 Sales Desgin -  ![alt text](Untitled-2024-02-09-0947-1.png)  The value objects are writtine in inventory api and the sales api
 under their respective models.

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

Made a directory in my terminal.  I then forked and cloned the git url and placed it into that directory.

built and ran a project in Docker, inside that same directory, which allowed me to open up my containers

the rest is the explaination of what I did in this project.  Most are in order in how I did it.

The inventory microservice is made up of three models
    -Manufacuturer, Vehiclemodel, and Automobile. (this is in sequential order in what needs to come from what)
There are connected to API endpoints that allow us to POST and GET the data it is storing.

    ALL HAVE A PORT OF 8100 TO THE HOST MACHINE.  THIS WAS THE PORT TO COMMUNICATE TO THE INVENTORY-API
    -List manufacturers	GET	http://localhost:8100/api/manufacturers/
    -Create a manufacturer	POST	http://localhost:8100/api/manufacturers/
    -List vehicle models	GET	http://localhost:8100/api/models/
    -Create a vehicle model	POST	http://localhost:8100/api/models/
    -Get a specific vehicle model	GET	http://localhost:8100/api/models/:id/
    -etc.....
These are also rendered on the front end using those same endpoints in their respected .js files.

We take that information we we will use it as a base to start the sales app.  Since it is
a seperate app, we will need complete the automobile poller in order to recieve the data we need>
That code is below:
def get_automobiles():
    response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
    content = json.loads(response.content)
    print(content)
    for auto in content["autos"]:
        auto_vo, created = AutomobileVO.objects.update_or_create(
            vin=auto["vin"],
            defaults={
                'sold': auto["sold"]
            }
the print(content) is a tool to use to show what you are polling from
the database.  It printed in my terminal, but would also print in the
corresponding container in DOCKER.

    Docker is used to simulate different data-bases and enviorments through containers.
    There are 7 containers in this project. The code above is meant to pull from inventory
    and into sales app.


    DOCKER CONTAINERS ALL HAVE A SPECIFIC PORT NUMBER IN ORDER TO COMMUNICATE WITH THAT CONTAINER.
    THEY CAN BE FOUND IN DOCKER-COMPOSE.YML FILE.  THEY ARE THEY ONES ON THE RIGHT SIDE OF THE COLON
    THE NUMBERS ARE ON THE LEFT ARE FOR THE PORT FOR THE HOST
        ports:
      - "8090:8000" sales/customers/salespeople
      - "8080:8000" service api
      -- "8100:8000" autmobiles/manufacturers
      - "3000:3000" local host



There is some stuff missing like the imports, but this should be the meat of it>

From this poller we can create the AutomobileVO that will take care of the data for the vin
of the vehicles, we will use that later...

Next we create the models for the sales APP which are the Salesperson, Customer, Sale, and AutomobileVO
These models are the machine that creates the data that will will input. We will also need the views that
will make that information visible to the client, as well as a path to get ther in the urls.py.
The views consist of a POST - the ability to create, and a GET  - a list of data.  Also, these views will
have detailencoders with properties of what data we want to pull from the models.  These views need to have
what model they are pulling from and what they are pulling from in those models.


i.e.
@require_http_methods(["GET", "POST"])
def api_sale(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content['automobile'])
            salesperson = Salesperson.objects.get(employee_id=content['salesperson'])
            customer = Customer.objects.get(first_name=content['customer'])
            sale = Sale.objects.create(
                price=content['price'],
                automobile=automobile,
                salesperson=salesperson,
                customer=customer
            )
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

One that is created, I went ahead and created the endpoints to test to see if these
models and views are creating what I needed.

    ALL THE PARAMETERS ARE DICTACTED BY THEIR RESPECTED MODELS
    ALL HAVE THE PORT 8090, MEANING THAT THIS THE PORT NUMBER THAT IT MUST GO THROUGH ON THE HOST MACHINE.
    POST http://localhost:8100/api/automobiles/
    {

  "color": "blue",
  "year": 2012,
  "vin": "1C4RJFBGXFC788391",
  "model_id": "7"

}
    GET http://localhost:8100/api/automobiles/

	"autos":
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
				"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Chrysler"
				}
			},
			"sold": false
		},
    Here are the
    List salespeople GET	http://localhost:8090/api/salespeople/ - returns a list of the sales people which is created by the SalesPeople model
    {
	"salespeople": [
		{
			"id": 6,
			"first_name": "James",
			"last_name": "Singer",
			"employee_id": 12345
		},
		{
			"id": 7,
			"first_name": "test",
			"last_name": "Maldonado",
			"employee_id": 1234
		}
	]
}

    Create a salesperson	POST	http://localhost:8090/api/salespeople/ creates the List of salespeople
    {
	"first_name": "Luis",
	"last_name": "Ralphy",
	"employee_id": "1235"
}

    List customers	GET	http://localhost:8090/api/customers/ list the customers created by the api below
    {
	"customer": [
		{
			"id": 8,
			"first_name": "Martin",
			"last_name": "Maldonado",
			"address": "1701 NW 56th St",
			"phone_number": "8157158485"
		}
	]
}
    Create a customer	POST	http://localhost:8090/api/customers/
    {
	"first_name": "Jane",
	"last_name": "Doe",
	"address": "300 Jefferson Dr.",
	"phone_number": "1234567890"
}

    List sales	GET	http://localhost:8090/api/sales/ creates a sale, needs info from AutomobileVO, Salersperson model,

	"sales":
		{
			"id": 12,
			"price": "5.00",
			"automobile": {
				"sold": false,
				"vin": "1C3CC5FB2AN120134",
				"id": 16
			},
			"salesperson": {
				"id": 7,
				"first_name": "test",
				"last_name": "Maldonado",
				"employee_id": 1234
			},
			"customer": {
				"first_name": "test",
				"last_name": "test",
				"address": "test",
				"phone_number": "test"
			}
		},
		{
			"id": 13,
			"price": "5.00",
			"automobile": {
				"sold": false,
				"vin": "1C3CC5FB2AN120138",
				"id": 17
			},
			"salesperson": {
				"id": 7,
				"first_name": "test",
				"last_name": "Maldonado",
				"employee_id": 1234
			},
			"customer": {
				"first_name": "test",
				"last_name": "test",
				"address": "test",
				"phone_number": "test"
			}
		},
    Custer Model, all are ForeiegnKeys in the Sale model
    Create a sale	POST	http://localhost:8090/api/sales/
    {
	"price": "25000",
	"automobile": "1C3CC5FB2AN120134",
	"salesperson": "1234",
	"customer": "John"
}

once I tested these in insomnia.  Used a json body to input a POST,
and then the information was in the GET request.  Showing that my models,
views, and api endpoints are correct.

After this I move onto the front end in order to create a format that will
display my GET and POST requests that I made.

React works like this.  index.js is the structure, app.js has the big information to connect it all,
and the Nav.js is a way to navigate it all.  I created .js files for the different GET and POST requests
creating list and forms, which are just client interfaces that do the same thing you do in the backend.
Each page had and api endpoint that it was pulling from, that had to match what was in the backend(views/models).
The .js files are componets or functions that you input the information from the backend and return jsx that is
visible by the client.

The rest is format the return statment how you want it.  Double check to see your forms and list work
on the the front end.  Make sure your branch is stable and push/merge with main.  From there you
add., commit, and push to git.



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
Explain your models and integration with the inventory
microservice, here.

Made a directory in my terminal.  I then forked and cloned the git url and placed it into that directory.

built and ran a project in Docker, inside that same directory, which allowed me to open up my containers

the rest is the explaination of what I did in this project.  Most are in order in how I did it.

The inventory microservice is made up of three models
    -Manufacuturer, Vehiclemodel, and Automobile. (this is in sequential order in what needs to come from what)
There are connected to API endpoints that allow us to POST and GET the data it is storing.

    ALL HAVE A PORT OF 8100 TO THE HOST MACHINE.  THIS WAS THE PORT TO COMMUNICATE TO THE INVENTORY-API
    -List manufacturers	GET	http://localhost:8100/api/manufacturers/
    -Create a manufacturer	POST	http://localhost:8100/api/manufacturers/
    -List vehicle models	GET	http://localhost:8100/api/models/
    -Create a vehicle model	POST	http://localhost:8100/api/models/
    -Get a specific vehicle model	GET	http://localhost:8100/api/models/:id/
    -etc.....
These are also rendered on the front end using those same endpoints in their respected .js files.

We take that information we we will use it as a base to start the sales app.  Since it is
a seperate app, we will need complete the automobile poller in order to recieve the data we need>
That code is below:
def get_automobiles():
    response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
    content = json.loads(response.content)
    print(content)
    for auto in content["autos"]:
        auto_vo, created = AutomobileVO.objects.update_or_create(
            vin=auto["vin"],
            defaults={
                'sold': auto["sold"]
            }
the print(content) is a tool to use to show what you are polling from
the database.  It printed in my terminal, but would also print in the
corresponding container in DOCKER.

    Docker is used to simulate different data-bases and enviorments through containers.
    There are 7 containers in this project. The code above is meant to pull from inventory
    and into sales app.


    DOCKER CONTAINERS ALL HAVE A SPECIFIC PORT NUMBER IN ORDER TO COMMUNICATE WITH THAT CONTAINER.
    THEY CAN BE FOUND IN DOCKER-COMPOSE.YML FILE.  THEY ARE THEY ONES ON THE RIGHT SIDE OF THE COLON
    THE NUMBERS ARE ON THE LEFT ARE FOR THE PORT FOR THE HOST
        ports:
      - "8090:8000" sales/customers/salespeople
      - "8080:8000" service api
      -- "8100:8000" autmobiles/manufacturers
      - "3000:3000" local host



There is some stuff missing like the imports, but this should be the meat of it>

From this poller we can create the AutomobileVO that will take care of the data for the vin
of the vehicles, we will use that later...

Next we create the models for the sales APP which are the Salesperson, Customer, Sale, and AutomobileVO
These models are the machine that creates the data that will will input. We will also need the views that
will make that information visible to the client, as well as a path to get ther in the urls.py.
The views consist of a POST - the ability to create, and a GET  - a list of data.  Also, these views will
have detailencoders with properties of what data we want to pull from the models.  These views need to have
what model they are pulling from and what they are pulling from in those models.


i.e.
@require_http_methods(["GET", "POST"])
def api_sale(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content['automobile'])
            salesperson = Salesperson.objects.get(employee_id=content['salesperson'])
            customer = Customer.objects.get(first_name=content['customer'])
            sale = Sale.objects.create(
                price=content['price'],
                automobile=automobile,
                salesperson=salesperson,
                customer=customer
            )
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

One that is created, I went ahead and created the endpoints to test to see if these
models and views are creating what I needed.

    ALL THE PARAMETERS ARE DICTACTED BY THEIR RESPECTED MODELS
    ALL HAVE THE PORT 8090, MEANING THAT THIS THE PORT NUMBER THAT IT MUST GO THROUGH ON THE HOST MACHINE.
    POST http://localhost:8100/api/automobiles/
    {

  "color": "blue",
  "year": 2012,
  "vin": "1C4RJFBGXFC788391",
  "model_id": "7"

}
    GET http://localhost:8100/api/automobiles/

	"autos":
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
				"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Chrysler"
				}
			},
			"sold": false
		},
    Here are the
    List salespeople GET	http://localhost:8090/api/salespeople/ - returns a list of the sales people which is created by the SalesPeople model
    {
	"salespeople": [
		{
			"id": 6,
			"first_name": "James",
			"last_name": "Singer",
			"employee_id": 12345
		},
		{
			"id": 7,
			"first_name": "test",
			"last_name": "Maldonado",
			"employee_id": 1234
		}
	]
}

    Create a salesperson	POST	http://localhost:8090/api/salespeople/ creates the List of salespeople
    {
	"first_name": "Luis",
	"last_name": "Ralphy",
	"employee_id": "1235"
}

    List customers	GET	http://localhost:8090/api/customers/ list the customers created by the api below
    {
	"customer": [
		{
			"id": 8,
			"first_name": "Martin",
			"last_name": "Maldonado",
			"address": "1701 NW 56th St",
			"phone_number": "8157158485"
		}
	]
}
    Create a customer	POST	http://localhost:8090/api/customers/
    {
	"first_name": "Jane",
	"last_name": "Doe",
	"address": "300 Jefferson Dr.",
	"phone_number": "1234567890"
}

    List sales	GET	http://localhost:8090/api/sales/ creates a sale, needs info from AutomobileVO, Salersperson model,

	"sales":
		{
			"id": 12,
			"price": "5.00",
			"automobile": {
				"sold": false,
				"vin": "1C3CC5FB2AN120134",
				"id": 16
			},
			"salesperson": {
				"id": 7,
				"first_name": "test",
				"last_name": "Maldonado",
				"employee_id": 1234
			},
			"customer": {
				"first_name": "test",
				"last_name": "test",
				"address": "test",
				"phone_number": "test"
			}
		},
		{
			"id": 13,
			"price": "5.00",
			"automobile": {
				"sold": false,
				"vin": "1C3CC5FB2AN120138",
				"id": 17
			},
			"salesperson": {
				"id": 7,
				"first_name": "test",
				"last_name": "Maldonado",
				"employee_id": 1234
			},
			"customer": {
				"first_name": "test",
				"last_name": "test",
				"address": "test",
				"phone_number": "test"
			}
		},
    Custer Model, all are ForeiegnKeys in the Sale model
    Create a sale	POST	http://localhost:8090/api/sales/
    {
	"price": "25000",
	"automobile": "1C3CC5FB2AN120134",
	"salesperson": "1234",
	"customer": "John"
}

once I tested these in insomnia.  Used a json body to input a POST,
and then the information was in the GET request.  Showing that my models,
views, and api endpoints are correct.

After this I move onto the front end in order to create a format that will
display my GET and POST requests that I made.

React works like this.  index.js is the structure, app.js has the big information to connect it all,
and the Nav.js is a way to navigate it all.  I created .js files for the different GET and POST requests
creating list and forms, which are just client interfaces that do the same thing you do in the backend.
Each page had and api endpoint that it was pulling from, that had to match what was in the backend(views/models).
The .js files are componets or functions that you input the information from the backend and return jsx that is
visible by the client.

The rest is format the return statment how you want it.  Double check to see your forms and list work
on the the front end.  Make sure your branch is stable and push/merge with main.  From there you
add., commit, and push to git.
