# SparesCNX Dashboard for Incident Management : Incident Management - Back end

- Node server for incident management system.
- Allows CRUD operations on incidents

#### readme URL : https://github.com/websure/incident-management-api

#### Application URL : https://github.com/websure/incident-management-api

## About the Assignment :

- Express Node server for incident management system
- Endpoints for Incident CRUD endpoints
- Endpoint for User Login
- MongoDB for DB and Mongoose as ODM

### features

- Endpoints for Incident API
- /login endpoint for user login
- All Api's are validated for user authentication using middleware
- JOI for data validation
- Only Admin is allowed to create,Delete an incident
- Activity is saved with timestamp for Incident create , statu,assignee update

### Packages

    Express server
    Mongo dB
    Mongoose ODM
    JOI
    supertest

### Prerequisites

    Mongo DB
    Node js v > 10

### Bootstrapping Application

- clone the project : https://github.com/websure/incident-management-api.git
- cd to project root folder and execute following commands in the terminal
  - npm install
  - npm start
- Application will run on http://localhost:5000/

### User Details

sample mocked users

| User  | details                                                        |
| ----- | -------------------------------------------------------------- |
| admin | { userid: 'admin',isadmin: true, token: 'df34e.ffrh.mh7u8',}   |
| user1 | {userid: 'user1', isadmin: false,token: 'abdgc.uyih.khi7y', }  |
| user2 | {userid: 'user2', isadmin: false, token: 'frt53.oifh.hg6tr', } |

#### Endpoints

- Api docs can be found here -
  https://github.com/websure/incident-management-api/tree/main/api_docs

### Testing

- Testing files are available in ****tests**** folder
- To test the application , cd to project root folder and execute the command in
  the terminal
  - npm test
- Tests can be found here -
  https://github.com/websure/incident-management-api/tree/main/src/modules/incident/__tests__

### Postman collection

- Postman collection for API's can be found here -
  https://github.com/websure/incident-management-api/tree/main/postman-collection

### UI Screens

- UI screenshots can be found here -
- https://github.com/websure/incident-management-ui/tree/main/screens

### Reference

- Learn about Incident Management UI -
  https://github.com/websure/incident-management-ui

### Assumptions :

    For this assignment, User, session management is mocked.

### caveats

- TODO : Adding further test cases for different incident CRUD scenarios
- Implement User and session management
