import Client from '../database';

type Item = {
	id: number;
	quantity: number;
};

export type Order = {
	id?: number;
	user_id: number;
	status_of_order: string;
	products?: Item[];
};

export class OrderStore {
	// return orders with 'active' status to a specific user
	async currentOrder(userId: number): Promise<Order> {
		try {
			const conn = await Client.connect();
			const sql = `SELECT * FROM orders WHERE user_id=$1 AND status_of_order='active'`;
			//run querry on database to return all users
			const result = await conn.query(sql, [userId]);
			conn.release();
			const order = result.rows[0];
			return order;
		} catch (err) {
			throw new Error(`Cannot get order ${err}`);
		}
	}

	async create(userId: number): Promise<Order> {
		try {
			//open connection
			const conn = await Client.connect();
			const sql = 'INSERT INTO orders (user_id) VALUES ($1) RETURNING *';
			//apply querry
			const result = await conn.query(sql, [userId]);
			//close connection
			conn.release();
			//return created order
			const order = result.rows[0];
			return order;
		} catch (err) {
			throw new Error(`unable to create order : ${err}`);
		}
	}

	async addProduct(
		quantity: number,
		userId: number,
		productId: number
	): Promise<Order> {
		try {
			/* get users current order */

			const conn = await Client.connect();
			const sql = `SELECT * FROM orders WHERE user_id=$1 AND status_of_order='active'`;
			//run querry on database to return all users
			const orderId = await conn.query(sql, [userId]);

			/* add product to order */

			const sql2 =
				'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

			const result = await conn.query(sql, [quantity, orderId, productId]);

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(`Could not add product to order : ${err}`);
		}
	}
}
