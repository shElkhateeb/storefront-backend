import { Order, OrderStore } from '../../models/order';
import { UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import Client from '../../database';

const store = new OrderStore();
const uStore = new UserStore();
const pStore = new ProductStore();

describe('Order Model', () => {
	describe('Exsistance of Order Methods', () => {
		it('should have an index method', () => {
			expect(store.currentOrder).toBeDefined();
		});
		it('should have a create method', () => {
			expect(store.create).toBeDefined();
		});
		it('should have a delete method', () => {
			expect(store.addProduct).toBeDefined();
		});
	});

	describe('Functionality of Order Methods', async () => {
		const user = await uStore.create({
			email: 'tu@mail.com',
			first_name: 'Test',
			last_name: 'User',
			password: 'pass1234',
		});

		const product = await pStore.create({
			name: 'P1',
			price: 10,
		});

		afterAll(async ()=> {
			/* delete products and users*/
					//open connection
					const conn = await Client.connect();
					//delete products
					let sql = 'DELETE FROM products; DELETE FROM users';
					conn.query(sql);
					// reset id
					sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1; ALTER SEQUENCE users_id_seq RESTART WITH 1';
					conn.query(sql);
					//release connection
					conn.release();
		});

		it('create method should place a new order', async () => {
			const result = await store.create(user.id as number);
			expect(result.id).toEqual(1);
			expect(result.status_of_order).toEqual('active');
			expect(result.user_id).toEqual(user.id as number);
			expect(result.products).toEqual([]);
		});

		it('addProduct should add product to an exsisting order', async () => {
			const result = await store.addProduct(
				5,
				user.id as number,
				product.id as number
			);
			expect(result.id).toEqual(1);
			expect(result.user_id).toEqual(1);
		});
	});
});
