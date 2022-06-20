import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import { verifyAuthtoken } from './middleware/token';

const store = new OrderStore();

const currentOrder = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userID);
		const activeOrder = await store.currentOrder(userId);
		res.json(activeOrder);
	} catch (err) {
		res.status(400);
		res.json({
			message: 'Could not display current order',
			error: err,
		});
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userID);
		const newOrder = await store.create(userId);
		res.json(newOrder);
	} catch (err) {
		res.status(400);
		res.json({
			message: 'Could not create order',
			error: err,
		});
	}
};

const addProduct = async (req: Request, res: Response) => {
	const userId = parseInt(req.params.userID);
	const productId = parseInt(req.body.productId);
	const quantity: number = parseInt(req.body.quantity);

	try {
		const addedProduct = await store.addProduct(quantity, userId, productId);
		res.json(addedProduct);
	} catch (err) {
		res.status(400);
		res.json({
			message: 'Could not Add product to order',
			error: err,
		});
	}
};

export const order_routes = (app: express.Application) => {
	app.get('/users/:userID/orders/current', verifyAuthtoken, currentOrder);
	app.post('/users/:userID/orders', verifyAuthtoken, create);
	app.post(
		'/users/:userID/orders/current/products',
		verifyAuthtoken,
		addProduct
	);
};
