import { User, UserStore } from '../../models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

const store = new UserStore();

describe('User Model', () => {
	describe('Exsistance of User Methods', () => {
		it('should have an index method', () => {
			expect(store.index).toBeDefined();
		});
		it('should have a show method', () => {
			expect(store.show).toBeDefined();
		});
		it('should have a create method', () => {
			expect(store.create).toBeDefined();
		});
		it('should have a delete method', () => {
			expect(store.delete).toBeDefined();
		});
		it('should have an authenticate method', () => {
			expect(store.authenticate).toBeDefined();
		});
	});

	describe('Functionality of User Methods', () => {
		const user = {
			email: 'tu@mail.com',
			first_name: 'Test',
			last_name: 'User',
			password: 'pass1234',
		} as User;

		it('create method should register a new user', async () => {
			const result = await store.create(user);
			expect(result.id).toEqual(1);
			expect(result.email).toEqual(user.email);
			expect(result.first_name).toEqual(user.first_name);
			expect(result.last_name).toEqual(user.last_name);
			expect(
				bcrypt.compareSync(
					(user.password as string) + pepper,
					result.password_digest as string
				)
			).toBe(true);
		});

		it('authenticate method should return authenticated userrow', async () => {
			const authenticatedUser = await store.authenticate(
				user.email,
				user.password as string
			);
			expect((authenticatedUser as User).email).toBe(user.email);
			expect((authenticatedUser as User).first_name).toBe(user.first_name);
			expect(authenticatedUser?.last_name).toBe(user.last_name);
		});

		it('index method should return an array of userrows', async () => {
			const result = await store.index();
			expect(result[0].id).toEqual(1);
			expect(result[0].email).toEqual(user.email);
			expect(result[0].first_name).toEqual(user.first_name);
			expect(result[0].last_name).toEqual(user.last_name);
			expect(
				bcrypt.compareSync(
					(user.password as string) + pepper,
					result[0].password_digest as string
				)
			).toBe(true);
		});

		it('show method should return the correct user row', async () => {
			const result = await store.show(1);
			expect(result.id).toEqual(1);
			expect(result.email).toEqual(user.email);
			expect(result.first_name).toEqual(user.first_name);
			expect(result.last_name).toEqual(user.last_name);
			expect(
				bcrypt.compareSync(
					(user.password as string) + pepper,
					result.password_digest as string
				)
			).toBe(true);
		});

		it('delete method called with id=1 should return id=1', async () => {
			const result = await store.delete(1);
			expect(result).toEqual(1);
		});

		it('index method should return an empty array afrer deletion', async () => {
			const result = await store.index();
			expect(result.length).toEqual(0);
		});
	});
});
