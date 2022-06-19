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
To start the server run the `npm run start` command from the terminal. The backend runs on port 3000, and the database on port 5432.
### Other Commands
- prettier: `npm run prettier`
- start: `npm run start`
- watch: `npm run watch`
- test: `npm run test`
#### Database Migrations
- Create all tables: `npx db-migrate up`
- Drop one table at a time: `npx db-migrate up`
- Drop all tables: `npx db-migrate reset`


## Resources
- [PostgreSQL – Data Types](https://www.geeksforgeeks.org/postgresql-data-types/)
- [Default Values](https://www.postgresql.org/docs/current/ddl-default.html#:~:text=If%20no%20default%20value%20is,after%20the%20column%20data%20type.)
- [Routing](https://expressjs.com/en/guide/routing.html)

## Author
- Shorouk Elkhateeb
