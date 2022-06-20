import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import { verifyAuthtoken } from './middleware/token';
const jwt = require('jsonwebtoken');

const Store = new UserStore();

const index = async (_req: Request, res: Response) => {
	try {
		const users = await Store.index();
		res.json(users);
	} catch (err) {
		res.json({
			message: 'Could not display users',
			error: err,
		});
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const user = await Store.show(parseInt(req.params.id));
		res.json(user);
	} catch (err) {
		res.json({
			message: 'Could not display user',
			error: err,
		});
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const user: User = {
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			password: req.body.password,
		};
		const newUser = await Store.create(user);
		var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
		res.json({
			user: newUser,
			token: token,
		});
	} catch (err) {
		res.json({
			message: 'Could not create user',
			error: err,
		});
	}
};

const del = async (req: Request, res: Response) => {
	try {
		const deletedUserId = await Store.delete(parseInt(req.params.id));
		res.json(deletedUserId);
	} catch (err) {
		res.json({
			message: 'Could not delete user',
			error: err,
		});
	}
};

const authenticate = async (req: Request, res: Response) => {
	try {
		const regUser = await Store.authenticate(req.body.email, req.body.password);
		var token = jwt.sign({ user: regUser }, process.env.TOKEN_SECRET);
		res.json({
			user: regUser,
			token: token,
		});
	} catch (err) {
		res.json({
			message: 'Could not authenticate user',
			error: err,
		});
	}
};

export const user_routes = (app: express.Application) => {
	app.get('/users', verifyAuthtoken, index);
	app.get('/users/:id', verifyAuthtoken, show);
	app.post('/users', create);
	app.delete('/users/:id', verifyAuthtoken, del);
	app.post('/users/authenticate', authenticate);
};
