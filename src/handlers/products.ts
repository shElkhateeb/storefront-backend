import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyAuthtoken } from './middleware/token';

const Store = new ProductStore();

const index = async (_req: Request, res: Response) => {
	try {
		const products = await Store.index();
		res.json(products);
	} catch (err) {
		res.json({
			message: 'Could not display products',
			error: err,
		});
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const product = await Store.show(parseInt(req.params.id));
		res.json(product);
	} catch (err) {
		res.json({
			message: 'Could not display product',
			error: err,
		});
	}
};

const create = async (req: Request, res: Response) => {
	const product: Product = {
		name: req.body.name,
		price: req.body.price,
	};
	try {
		const newProduct = await Store.create(product);
		res.json(newProduct);
	} catch (err) {
		res.json({
			message: 'Could not create product',
			error: err,
		});
	}
};

const del = async (req: Request, res: Response) => {
	try {
		const deletedProduct = await Store.delete(parseInt(req.params.id));
		res.json(deletedProduct);
	} catch (err) {
		res.json({
			message: 'Could not delete product',
			error: err,
		});
	}
};

export const product_routes = (app: express.Application) => {
	app.get('/products', index);
	app.get('/products/:id', show);
	app.post('/products', verifyAuthtoken, create);
	app.delete('/products/:id', verifyAuthtoken, del);
};
