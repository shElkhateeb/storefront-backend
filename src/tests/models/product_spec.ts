import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
	describe('Exsistance of Product Methods', () => {
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
	});

	describe('Functionality of User Methods', () => {
		const product = {
			name: 'P1',
			price: 10,
		} as Product;

		it('create method should add a new product', async () => {
			const result = await store.create(product);
			expect(result.id).toEqual(1);
			expect(result.name).toEqual(product.name);
			expect(result.price).toEqual(product.price);
		});

		it('index method should return an array of products', async () => {
			const result = await store.index();
			expect(result[0].id).toEqual(1);
			expect(result[0].name).toEqual(product.name);
			expect(result[0].price).toEqual(product.price);
		});

		it('show method should return the correct product', async () => {
			const result = await store.show(1);
			expect(result.id).toEqual(1);
			expect(result.name).toEqual(product.name);
			expect(result.price).toEqual(product.price);
		});

		it('index method should return an empty array afrer deletion', async () => {
			await store.delete(1);
			const result = await store.index();
			expect(result.length).toEqual(0);
		});
	});
});
