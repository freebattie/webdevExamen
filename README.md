[![Node.js CI](https://github.com/freebattie/webdevExamen/actions/workflows/node.js.yml/badge.svg)](https://github.com/freebattie/webdevExamen/actions/workflows/node.js.yml)
# exam-freebattie
exam-freebattie created by GitHub Classroom
## azure link
https://modernsnack.azurewebsites.net/
## Details:

### ISSIUES
repo was not setup from the teacher in a way where i was abel to use github secrets
had to hardcode and also upload a .inv file to github to get CI/CD up and running
I know this is not how you do it in the real world, i would normaly never upload this.
but due to the limits on the repo and demand for ci/cd and since the repo is private 
i decided to hardcode the azure info to the yml file and the database info in the .inv file


### users
### starting users:
* username: hansemann
* password: 4321
* username:Petter123
* password:1234

### admin
* username:administrator
* password:1234;

### emp
* username:emp
* password:1234

when you get to the homepage you can see all dishes but if you try to order when not logged inn
you get a error message and link to home/login
you can log in, create new user or chat over websocket

when loged in as user you can add order and see all your orders
you can only make orders from the day it is and only between 8 and 21
you can add or remove items from the list
when you go to orders you can see each order total
when you are logged in as administrator or employ you can see all users orders

## endpoins
### login
* /api/login (POST(Login),GET,DELETE(Logut))
* /api/login/new (POST)
  * testing of endpoints in loginAPI.test.js and dishesApi.test.js

### dishes
* api/dish (GET;POST,PUT,DELETE)
* api/dish/orders (GET,POST)

### admin
* api/admin (Get,PUT) 
  * Only on serverside and only used in in the admin.test.js can be used to see all user and edit user

## Open endpoints
/api/login/new (POST)
/api/dish (GET)
## code coverage links


* [x] Some form of Login and access control
* [x] Jest tests
 * [x] Snapshot tests
 * [x] Simulate + jest.fn
 * [x] Supertest
* [x] Github Actions with coverage report
* [x] Deployment to cloud (in this case, Azure)
* [x] Mongodb
* [x] Navigating in the application using React Router (remember Express Middleware)
* [x] Reading data from the server (remember error handling)
* [x] Writing data to the server
* [x] Websockets

##FRONTEND
* [x] 2 react pages whit react router (R1)
* [x] add state to at least one page(R1)
* [x] navigate back or homepage(R1)
* [] at lest one GET,POST,PUT and DELETE format is json(R2)
* [x] RESTful api using Fetch(R2)
* []  endpoints listed in readme(R4)
* [x] integration whit github actions and run tests(R2)
* [x] login using cookies(R3)
* [x] loginpage(R3)
* [x] loged in user should see a persnal message( welcome "admin" etc)(R3)
* [x] logout from enywhere(R3)
* [x] 401 user not logedinn at all(R4)
* [x] 403 loged in but dont have permission(R4)
* [x] CI/CD to azure(R5)


##BACKEND
* [x] 401 user not loged inn at all(R4)
* [x] 403 loged in but dont have permission(r4)
* [x] GET,POST,PUT and DELETE(R2)
* [ ] list all test for endpoints in readmefile(R4)
* [x] mark public endpoints in the endpoint(R4)
* [x] create asecurity-test.js that test 401 and 403(R4)( had to spread them out in all 3 server endpoints files)
* [x] integration whit github actions and run tests(R3)
* [x] CI/CD to azure(R5)

##TESTING
  ###BACKEND
  
    * [x] 50% coverage
    * [x] 60% coverage
    * [x] 70% coverage
    * [ ] 80% coverage
  ###FRONTEND
  
    * [x] 50% coverage
    * [x] 60% coverage
    * [x] 70% coverage
    * [x] 80% coverage
    
##TASK
* [x] see dishes form mongodb whit basic test data (T1)
* [x] create a account (T2)
* [x] predefind admins accounts (admininstrator) aslo adding employees see EXSTRA(T2)
* [x] admin can log in add,edit and remove items(T3)(ingridents)
* [x] diffrent api paths for users and admins and checks for 401 403(T4)
* [x] customer can create a order with a place and time if logged in(T5)


## extra
* [ ] list of extrea
* [x] prettieer
* [x] administrator cna see all orders, user can see there ordes only
* [x] endpoint for admin only ("/api/admin) where he can see all users and change user values
  * only implementeted on server side and tested in adminRouter.test.js
* [x] 401 and 403 handeled on server and client side(client side shows error component)
* [x] custom hook useLoading



  





