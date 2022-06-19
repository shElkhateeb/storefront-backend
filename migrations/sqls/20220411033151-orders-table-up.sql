CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    status_of_order VARCHAR(15) DEFAULT 'active'
);