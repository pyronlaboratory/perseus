# Data Services

API services created using Flask framework

### Project dependencies:

  

-  `apispec==5.1.0`: A pluggable API specification generator to create *OpenAPI Specification* in json/yaml format.

-  `apispec-webframeworks==0.5.2`: APISpec plugins for integrating with various web frameworks.

-  `Flask==2.0.1`: Python based microframework for web development.

-  `Flask-Cors==3.0.10`: A Flask extension for handling Cross Origin Resource Sharing (CORS), allowing cross-origin requests.

-  `marshmallow==3.13.0`: An ORM/ODM/framework-agnostic library for converting complex datatypes, such as objects, to and from native Python datatypes.

-  `unittest`: Python's in-built unit test framework.

-  `python-dateutil==2.8.2`: Datetime utility library.

-  `Werkzeug==2.0.1`: A comprehensive WSGI web application library.

  

### Project directory:

  

```
core files for the data service

├───app.py
├───schema.py
├───utils.py
 
unit tests for the endpoints

├───tests.py

asset directory containing *.json files

├───data/

swagger ui files for api documentation

├───swagger
  ├───static
  └───templates

project dependencies

|───requirements.txt

containerization and deployment files

|───Dockerfile
|───heroku.yml

```

  
## Setting up development environment:

#### Creating virtual environment:   

Clone the repository locally from [here](https://github.com/pyronlaboratory/perseus.git)
```
$ git clone https://github.com/pyronlaboratory/perseus.git
```
Activate virtual environment and install dependencies from `requirements.txt`
```
$ cd '.\Perseus\data services\'

$ python -m virtualenv dev

$ .\dev\Scripts\activate

(dev) $ pip install -r requirements.txt
```
Start the server and head over to [localhost on port 5000](http://localhost:5000).
```
(dev) $ python app.py
```
#### Enabling cross-origin-resource-sharing:
By default, submission of cookies across domains is disabled due to the security implications. Initialize the *Flask-CORS* extension with default arguments in order to allow CORS for all domains on all routes.
```
# app.py

from flask import Flask
from flask_cors import CORS
...

app = Flask(__name__)
CORS(app)

@app.route("/")
def helloWorld():
  return "Hello, cross-origin-world!"
...

```

#### Swagger UI for testing API endpoints:  

*Swagger UI allows anyone — be it your development team or your end consumers — to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from your OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for back end implementation and client side consumption.*

-- from [Swagger UI Official Website](https://swagger.io/tools/swagger-ui/)

![Dashboard](media/Swagger%20UI%20Dashboard%20Screenshot.png)

Headover to [/docs](http://localhost:5000/docs) to access Swagger UI 



## Dockerizing the application:

Build and run docker image locally
```

$ docker build -t ronyx/perseus-data-service:latest .
$ docker run -it -p 5000:5000 ronyx/perseus-data-service:latest

```    
> Note: Above docker images are also available on *Docker Hub*. Check out [here](https://hub.docker.com/u/ronyx)

## Deploying the application on Heroku:

If you haven't already, log in to your *Heroku* account and follow the prompts to create a new SSH public key using the following `heroku-cli` command.

```
$ heroku login

```
Once logged in, create an application and connect remote repository to local codebase.
```
$ heroku create perseus-data-service

$ git init

$ heroku git:remote -a perseus-data-service

```
Commit local codebase to the remote repository
```
$ git add .

$ git commit -m "deployment data service: v1.0"

```
Create `heroku.yml` file in the root directory.
```
# heroku.yml

build:
  docker:
    web: Dockerfile

```
Stack container to your heroku's applications dyno and push local commit changes.

```
$ heroku stack:set container

$ git push heroku master
```
Service API is available [here](https://perseus-data-service.herokuapp.com/)  