// import supertest from 'supertest';
// import { app } from './../../server';
// import { User, UserStore } from '../../models/user';
// import Client from '../../database';

// const request = supertest(app);
// const store = new UserStore();

// describe('Products Endpoints', () => {
// 	const user = {
// 		email: 'tu&mail.com',
// 		first_name: 'Test',
// 		last_name: 'User',
// 		password: '1234',
// 	} as User;

// 	// let res: Response;

// 	// beforeAll(async ()=> {
// 	// 	// res = await app.post('/users');
// 	// });

// 	// afterAll(async ()=> {
// 	// 	/* delete users*/
// 	// 			//open connection
// 	// 			const conn = await Client.connect();
// 	// 			//delete users
// 	// 			let sql = 'DELETE FROM USERS';
// 	// 			conn.query(sql);
// 	// 			// reset id
// 	// 			sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
// 	// 			conn.query(sql);
// 	// 			//release connection
// 	// 			conn.release();
// 	// });
// 	it('Index endpoint', async () => {
// 		const response = await request.get('/products');
// 		expect(response.status).toBe(200);
// 	});

// 	it('Show endpoint', async () => {
// 		const response = await request.get('/products/:id');
// 		expect(response.status).toBe(200);
// 	});

// 	it('Create endpoint', async () => {
// 		const response = await request.post('/products')
// 		.set('content-type', 'application/json')
// 		// .set('Authentication', `Bearer ${createdUser.token}`);
// 		expect(response.status).toBe(200);
// 	});

// 	it('Delete endpoint', async () => {
// 		const response = await request.delete('products/:id')
// 		.set('content-type', 'application/json')
// 		// .set('Authentication', `Bearer ${token}`);
// 		expect(response.status).toBe(200);
// 	});
// });
