import supertest from 'supertest';
import { app } from './../../server';
import { User, UserStore } from '../../models/user';
import Client from '../../database';

const request = supertest(app);
const store = new UserStore();

describe('Users Endpoints', () => {
	const user = {
		email: 'uh@mail.com',
		first_name: 'Test',
		last_name: 'User',
		password: '1234',
	} as User;

	let token: string;

	beforeAll(() => {});

	afterAll(async () => {
		/* delete users*/
		//open connection
		const conn = await Client.connect();
		//delete users
		let sql = 'DELETE FROM USERS';
		conn.query(sql);
		// reset id
		sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
		conn.query(sql);
		//release connection
		conn.release();
	});

	it('Create endpoint', async () => {
		const response = await request
			.post('/users')
			.set('content-type', 'application/json')
			.send(user);
		expect(response.status).toBe(200);

		/* check response body */
		expect(response.body.user.id).toBe(1);
		expect(response.body.user.email).toBe(user.email);
		expect(response.body.user.first_name).toBe(user.first_name);
		expect(response.body.user.last_name).toBe(user.last_name);

		token = response.body.token;
	});

	it('Authenticate endpoint', async () => {
		const response = await request
			.post('/users/authenticate')
			.set('content-type', 'application/json')
			.send({
				email: user.email,
				password: user.password,
			});
		expect(response.status).toBe(200);

		/* check response body */
		expect(response.body.user.id).toBe(1);
		expect(response.body.user.email).toBe(user.email);
		expect(response.body.user.first_name).toBe(user.first_name);
		expect(response.body.user.last_name).toBe(user.last_name);

		token = response.body.token;
	});

	it('Index endpoint', async () => {
		const response = await request
			.get('/users')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

	it('Show endpoint', async () => {
		const response = await request
			.get('/users/:id')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
});
