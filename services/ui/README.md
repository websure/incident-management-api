# SparesCNX Dashboard for Incident Management : Incident Management - Front End

- Authenticated UI dashboard for incident management.
- Allows CRUD on incidents

### readme URL : https://github.com/websure/incident-management-ui/

### Application URL : https://github.com/websure/incident-management-ui

## About the Assignment :

- Responsive react application to view list of available Incidents and their
  current status.
- Admin user is allowed to create / Delete an incident
- All users are allowed to view and edit incidents
- only assigned user can acknowledge the incident
- Integration with MongoDB and Express Node server

### Packages

    Bootstrapped using Create react app
    React js
    Context Api for Application state
    react testing library
    semantic ui react
    React testing library, Jest

### Bootstrapping Application

- clone the project : https://github.com/websure/incident-management-ui.git
- cd to project root folder and execute following commands in the terminal
  - npm install
  - npm start
- Application will run on http://localhost:3000/
- Assumptions :
  - For scope of this assignment, User management is mocked.
  - Use following user details for login -
    https://github.com/websure/incident-management-ui/blob/main/src/components/incident/constants.js#L20

### User Details

For login use following user credentials

| User  | details                                                        |
| ----- | -------------------------------------------------------------- |
| admin | { userid: 'admin',isadmin: true, token: 'df34e.ffrh.mh7u8',}   |
| user1 | {userid: 'user1', isadmin: false,token: 'abdgc.uyih.khi7y', }  |
| user2 | {userid: 'user2', isadmin: false, token: 'frt53.oifh.hg6tr', } |

### features

- Responsive Application
- Dashboard page to display list of Incident created
- Add button to Create a Incident
- Auto creation of newly created Incident ID
- Integration with node server at port 5000
- Usage of Eslint, Prettier
- Tests with React Testing Library, hooks
- Responsive library - semantic ui react
- smart Table for
  - listing incidents
  - Lazy loading
  - API sorting
  - color code for incident status

#### Pages

- List Page : lists incidents in table and allow sorting, lazy loading
- List details Page :
  - Show incident details, Activity details.
  - Allow update and delete operations on Incident
  - User activity is ONLY implemented for assignee and status change
- Header section
  - Allows Incident creation and logout

### Testing

- Testing files are available in ****tests**** folder
- To test the application , cd to project root folder and execute the command in
  the terminal
  - npm test
  - npm run test:coverage
  -

### UI Screens

- UI screenshots can be found here -
  https://github.com/websure/incident-management-ui/tree/main/screens

### Reference

- Learn about Incident Management Api server and Mongo DB -
  https://github.com/websure/incident-management-api

### caveats

- TODO : Adding further test cases for different incident CRUD scenarios
- Improve Table features like - Column Search.
- To change activity rendering functionality
- Implement user and session management.
