# NodeJS Auth REST API with Express, Mysql, and JWT Authentication

## Tools
* NodeJS/Express: Server
* MySQL: Storage
* JWT: Token based authentication
* bcryptjs: Password security
* winston/morgan: Logs
* Joi: Validations

## Available scripts
* `start`: Starts the server with node
* `start:dev`: Starts the server in watch mode
* `db:up`: Creates the database
* `db:down`: Drops the database
* `tables:up`: Creates database tables
* `db:init`: Creates both the database and tables

## Getting started

update the variable values with valid ones in `.env` file

Install the required dependencies with

```sh
npm install
```

Initialize the database with

```sh
npm run db:init
```

Start the app with

```sh
npm start
```

You can also start it in watch mode with

```sh
npm run start:dev
```