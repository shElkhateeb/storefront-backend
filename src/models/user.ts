import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export type User = {
	id?: number;
	email: string;
	first_name: string;
	last_name: string;
	password?: string;
	password_digest?: string;
};

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

export class UserStore {
	async index(): Promise<User[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM users';
			//run querry on database to return all users
			const result = await conn.query(sql);
			conn.release();
			const users = result.rows;
			return users;
		} catch (err) {
			throw new Error(`Cannot get users ${err}`);
		}
	}

	async show(id: number): Promise<User> {
		try {
			const sql = 'SELECT * FROM users WHERE id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			const user = result.rows[0];
			return user;
		} catch (err) {
			throw new Error(`Could not find user ${id}. Error: ${err}`);
		}
	}

	async create(u: User): Promise<User> {
		try {
			const conn = await Client.connect();
			const sql =
				'INSERT INTO users (email, first_name, last_name, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
			const hash = bcrypt.hashSync(
				(u.password as string) + pepper,
				parseInt(saltRounds)
			);
			const result = await conn.query(sql, [
				u.email,
				u.first_name,
				u.last_name,
				hash,
			]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (err) {
			throw new Error(
				`unable to create user ${(u.first_name, u.last_name)}: ${err}`
			);
		}
	}

	async delete(id: number): Promise<number> {
		try {
			const sql = 'DELETE FROM users WHERE id=($1)';
			const conn = await Client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return id;
		} catch (err) {
			throw new Error(`Could not delete user ${id}. Error: ${err}`);
		}
	}

	async authenticate(email: string, password: string): Promise<User | null> {
		try {
			const conn = await Client.connect();

			//get password_digest related to the email
			const sql = 'SELECT password_digest FROM users WHERE email=($1)';
			const result = await conn.query(sql, [email]);
			conn.release();

			//if email exsists in database save row in user variable
			if (result.rows.length) {
				const user = result.rows[0];

				//compare the hashed password with password_digest in the database
				if (bcrypt.compareSync(password + pepper, user.password_digest)) {
					return user;
				}
			}
			return null;
		} catch (err) {
			throw new Error(`Could not authenticate user. Error: ${err}`);
		}
	}
}
