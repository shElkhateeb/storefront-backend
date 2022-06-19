# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- index `/products` [GET]
- show `/products/:id` [GET]
- create [token required] `/products` [POST]
- delete [token required] `/products/:id` [DELETE]

#### Users
- index [token required] `/users` [GET]
- show [token required] `/users/:id` [GET]
- create [token required] `/users` [POST]
- delete [token required] `/users/:id` [DELETE]

#### Orders
- Current Order by user (args: user id)[token required] `/users/:userID/orders/current` [GET]
- Add product to cart `/users/:userID/orders/current/products` [POST]

## Data Shapes
#### products
- id SERIAL PRIMARY KEY
- name VARCHAR(200) NOT NULL
- price float(2) NOT NULL

#### users
- id SERIAL PRIMARY KEY
- email VARCHAR(254) UNIQUE
- first_name VARCHAR(150) NOT NULL
- last_name VARCHAR(150) NOT NULL
- password_digest VARCHAR(150) NOT NULL

#### orders
- id SERIAL PRIMARY KEY
- user_id bigint REFERENCES users(id)
- status_of_order VARCHAR(15) DEFAULT 'active'

#### order_products
- id SERIAL PRIMARY KEY
- quantity integer
- order_id bigint REFERENCES orders(id)
- product_id bigint REFERENCES products(id)