import Client from '../database';

export type Product = {
	id?: number;
	name: string;
	price: number;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM products';
			//run querry on database to return all users
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get products: ${err}`);
		}
	}

	async show(id: number): Promise<Product> {
		try {
			const sql = 'SELECT * FROM products WHERE id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find product ${id}. Error: ${err}`);
		}
	}

	async create(p: Product): Promise<Product> {
		try {
			const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
			// @ts-ignore
			const conn = await Client.connect();

			const result = await conn.query(sql, [p.name, p.price]);

			const product = result.rows[0];

			conn.release();

			return product;
		} catch (err) {
			throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
		}
	}

	async delete(id: number): Promise<void> {
		try {
			const sql = 'DELETE FROM products WHERE id=($1)';
			const conn = await Client.connect();
			await conn.query(sql, [id]);
			conn.release();
		} catch (err) {
			throw new Error(`Could not delete product ${id}. Error: ${err}`);
		}
	}
}
