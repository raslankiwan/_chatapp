import express, { Request, Response } from 'express';
import { Message } from '../models';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();

router.route('/').post(
	body('sender').isMongoId().withMessage('not valid mongo id'),
	body('receiver')
		.isMongoId()
		.withMessage('not valid mongo id')
		.notEmpty(),
    body('conversation').isMongoId().withMessage('not valid mongo id'),
    body('value').notEmpty(),
	async (req: Request, res: Response) => {
		const result = validationResult(req);
		if (result.isEmpty()) {
			console.log(result);

			const { sender, receiver, conversation, value } = req.body;
			const message = await Message.create({
				sender, receiver, conversation, value
			});
			res.send({ message });
		}
		res.send({ result });
	}
);

router.get(
	'/conversation/:conversationId',
	param('conversationId').isMongoId().withMessage('Please send a valid mongo id'),
	async (req: Request, res: Response) => {
		const result = validationResult(req);

		if (result.isEmpty()) {
			console.log(result);

			const { conversationId } = req.params;
			const messages = await Message.find({
				conversation: conversationId
			});
			res.send({ messages });
		}
		res.send({ result });
	}
);

export { router as messageRouter };

