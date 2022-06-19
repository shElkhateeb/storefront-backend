import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');

export const verifyAuthtoken = (
	req: Request,
	res: Response,
	next: Function
) => {
	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader?.split(' ')[1];
		jwt.verify(token, process.env.TOKEN_SECRET);
		next();
	} catch (err) {
		res.status(401);
		res.json('Access denied, invalid token');
	}
};
