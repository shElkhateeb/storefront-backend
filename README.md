# Storefront Backend

## Overview
Storefront API using node js connected to a Postgres database.

## Description
A storefront backend to support connecting to a database and allow making changes to the database. the database has 4 tables: 
- users
- products
- orders
- order_products

The  application makes use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Usage
1. We use a docker container for the postgreSQL database. To create the container and setup the `shopping` database, run the `docker-compose up --detach` command in the terminal.
2. We create tables by running the `npx db-migrate up` command.
3. To start the server run the `npm run start` command from the terminal. The backend runs on port 3000, and the database on port 5432.

#### Database Migrations
- Create all tables: `npx db-migrate up`
- Drop one table at a time: `npx db-migrate up`
- Drop all tables: `npx db-migrate reset`

### Other Commands
- prettier: `npm run prettier`
- start: `npm run start`
- watch: `npm run watch`
- test: `npm run test`

To connect to the container we run `docker exec  -i -t storefront-backend_postgres_1 /bin/bash` where `storefront-backend_postgres_1` is the container name.
To connect to the postgreSQL database we run the following command in the terminal:
`psql shopping -h localhost -U shopping_user postgres` where `shopping` is the `POSTGRES_DB` and `shopping_user` is the `POSTGRES_USER`.

## Resources
- [PostgreSQL – Data Types](https://www.geeksforgeeks.org/postgresql-data-types/)
- [Default Values](https://www.postgresql.org/docs/current/ddl-default.html#:~:text=If%20no%20default%20value%20is,after%20the%20column%20data%20type.)
- [Routing](https://expressjs.com/en/guide/routing.html)
- [Docker PostgreSQL Tutorial with Persistent Data](https://www.youtube.com/watch?v=G3gnMSyX-XM&t=201s)
- [docker-compose up](https://docs.docker.com/compose/reference/up/)
- [frequent-docker-commands.sh](https://gist.github.com/orette/9e0c98cf89138299fcf82016e8a45d55)

## Author
- Shorouk Elkhateeb
