import supertest from 'supertest';
import { app } from './../../server';
import { User } from '../../models/user';
import Client from '../../database';
import { Product } from '../../models/product';
import { Order, OrderStore } from '../../models/order';
import exp from 'constants';

const request = supertest(app);

const store = new OrderStore();

describe('Orders Endpoints', () => {
	const product = {
		name: 'p1',
		price: 11,
	} as Product;

	const user = {
		email: 'oh@mail.com',
		first_name: 'Test',
		last_name: 'User',
		password: '1234',
	} as User;

	let token: string;

	let order: Order;

	beforeAll(async () => {
		/* create user to recieve token */
		const response = await request
			.post('/users')
			.set('content-type', 'application/json')
			.send(user);

		user.id = response.body.user.id;

		token = response.body.token;
		//create order
		order = await store.create(user.id as number);
	});

	afterAll(async () => {
		/* delete orders, products, and users*/
		//open connection
		const conn = await Client.connect();
		//delete orders, products, users
		let sql = 'DELETE FROM orders; DELETE FROM products; DELETE FROM users';
		conn.query(sql);
		// reset id
		sql =
			'ALTER SEQUENCE orders_id_seq RESTART WITH 1; ALTER SEQUENCE products_id_seq RESTART WITH 1; ALTER SEQUENCE users_id_seq RESTART WITH 1';
		conn.query(sql);
		//release connection
		conn.release();
	});

	it('Current order endpoint', async () => {
		const response = await request
			.get('/users/1/orders/current')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);

		expect(response.body.id).toBe(1);
		expect(parseInt(response.body.user_id)).toBe(user.id as number);
		expect(response.body.status_of_order).toBe('active');
	});
});
