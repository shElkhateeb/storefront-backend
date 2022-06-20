import supertest from 'supertest';
import { app } from './../../server';
import { User } from '../../models/user';
import Client from '../../database';
import { Product } from '../../models/product';

const request = supertest(app);

describe('Products Endpoints', () => {
	const product = {
		name: 'p1',
		price: 11,
	} as Product;

	const user = {
		email: 'ph@mail.com',
		first_name: 'Test',
		last_name: 'User',
		password: '1234',
	} as User;

	let token: string;

	beforeAll(async () => {
		const response = await request
			.post('/users')
			.set('content-type', 'application/json')
			.send(user);

		token = response.body.token;
	});

	afterAll(async () => {
		/* delete users*/
		//open connection
		const conn = await Client.connect();
		//delete users
		let sql = 'DELETE FROM users; DELETE FROM products';
		conn.query(sql);
		// reset id
		sql =
			'ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE products_id_seq RESTART WITH 1';
		conn.query(sql);
		//release connection
		conn.release();
	});

	it('Create endpoint', async () => {
		const response = await request
			.post('/products')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send(product);
		expect(response.status).toBe(200);
	});

	it('Index endpoint', async () => {
		const response = await request.get('/products');
		expect(response.status).toBe(200);
	});

	it('Show endpoint', async () => {
		const response = await request.get('/products/:id');
		expect(response.status).toBe(200);
	});
});
