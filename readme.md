# Bankly API

This is a basic bank-versioned API with the ability to signup, sign in, and initiate transfers

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Testing](#testing)
- [Limitations](#limitations)

### Documentation

Documentation is hosted at [https://documenter.getpostman.com/view/13274153/2s93CExwkL](https://documenter.getpostman.com/view/13274153/2s93CExwkL)

## Technologies

- [NodeJS](https://nodejs.org/) - Runtime Environment
- [ExpressJs](https://expressjs.com/) - Web Application Framework
- [MongoDb](https://www.mysql.com/) - Document Database Program
- [Mongoose](http://docs.sequelizejs.com/) - Object Data Modeling library for MongoDB.

#### Compiler

- [Babel](https://babeljs.io/) - Compiler for Next Generation JavaScript
- [Nodemon](https://nodemon.io/) - Watches for file changes and restarts your server.


## Getting Started

### Installation

- Install [NodeJS](https://nodejs.org/) and [MySQL](https://www.mysql.com/) on your computer
- Install [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/) globally
- Clone this repository 
- Use the `.env.example` file to setup your environmental variables and rename the file to `.env`
- Run `npm install` to install all dependencies
- You can run `npm run db:seed` to use the seed data provided
- Run `npm run dev` to start the development server
- Navigate to [localhost:4000/api/v1](http://localhost:4000/api/v1) to access the application


### Testing

#### Prerequisites

- [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

- After installing as shown above
- Navigate to [localhost:4000](http://localhost:4000/) in
  [Postman](https://getpostman.com/) to access the application

## Limitations
- It is not containerized
- No unit and e2e tests
- Caching is not implemented
