import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import Client from '../../database';

const store = new OrderStore();
const uStore = new UserStore();
const pStore = new ProductStore();

describe('Order Model', () => {
	describe('Exsistance of Order Methods', () => {
		it('should have a current order method', () => {
			expect(store.currentOrder).toBeDefined();
		});
	});

	describe('Functionality of Order Methods', async () => {
		let user: User;
		let product: Product;
		let order: Order;

		beforeAll(async () => {
			user = await uStore.create({
				email: 'om@mail.com',
				first_name: 'Test',
				last_name: 'User',
				password: 'pass1234',
			});
			product = await pStore.create({
				name: 'P1',
				price: 10,
			});
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
		it('Current order of user', async () => {
			const result = await store.currentOrder(user.id as number);
			expect(result.id).toBe(order.id);
			expect(result.status_of_order).toBe('active');
		});
	});
});
