import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { product_routes } from './handlers/products';
import { user_routes } from './handlers/users';
import { order_routes } from './handlers/orders';

export const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
	res.send('Hello World!');
});

//product routes
product_routes(app);

//user routes
user_routes(app);

//order routes
order_routes(app);

app.listen(3000, function () {
	console.log(`starting app on: ${address}`);
});
