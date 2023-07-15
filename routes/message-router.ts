import express, { Request, Response } from 'express';
import { Message } from '../models';
import { body, param, query } from 'express-validator';
import { authenticate, validateRequest } from '../middlewares';

const router = express.Router();

router.route('/').post(
	body('sender').isMongoId().withMessage('not valid mongo id'),
	body('receiver')
		.isMongoId()
		.withMessage('not valid mongo id')
		.notEmpty(),
    body('conversation').isMongoId().withMessage('not valid mongo id'),
    body('value').notEmpty(),
	validateRequest,
	authenticate,
	async (req: Request, res: Response) => {
		const { sender, receiver, conversation, value } = req.body;
		const message = await Message.create({
			sender, receiver, conversation, value
		});
		res.send({ message });
	}
);

router.get(
	'/conversation/:conversationId',
	param('conversationId').isMongoId().withMessage('Please send a valid mongo id'),
	query('page').isInt(),
	validateRequest,
	authenticate,
	async (req: Request, res: Response) => {
		const { conversationId } = req.params;
		const page = req.query.page as string
		const skipValue = (+page - 1) * 3
		const messages = await Message.find({
			conversation: conversationId
		}).skip(skipValue).limit(3);

		const total = await Message.find({
			conversation: conversationId
		}).count()

		return res.send({ messages, total });
	}
);

export { router as messageRouter };

