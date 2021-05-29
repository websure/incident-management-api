# SparesCNX Dashboard for Incident Management : Containerized repo

- Node server for incident management system.
- React App for UI
- Mondo DB for database

#### readme URL - UI : https://websure.github.io/incident-management-ui/

#### readme URL - API : https://websure.github.io/incident-management-api/

#### Application URL : https://github.com/websure/incident-management-api/

#### API Documentation : https://github.com/websure/incident-management-api/tree/main/api_docs

#### Branch to checkout : incident-container

## About the Assignment :

- Express Node server for incident management system - Runs on localhost:5000
- MongoDB for DB and Mongoose as ODM
- React app for front end - Runs on localhost:3000
- nginx for serving front-end

### Prerequisites

docker

### Stack

    Docker
    Express server
    Mongo dB
    Mongoose ODM
    JOI
    supertest

### Bootstrapping Application

- clone the project : https://github.com/websure/incident-management-api.git
- checkout to 'incident-container' branch
  - git checkout incident-container
- cd to project root folder and execute following commands in the terminal
  - docker-compose up
- Application will run on http://localhost:3000/

### Docker Images

- UI - websure/incident-ui
- API - websure/incident-api
