import express, { Request, Response } from 'express';
import { Conversation } from '../models';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();

router.route('/').post(
	body('first_user').isMongoId().withMessage('not valid mongo id'),
	body('second_user')
		.isMongoId()
		.withMessage('not valid mongo id')
		.notEmpty(),

	async (req: Request, res: Response) => {
		const result = validationResult(req);
		if (result.isEmpty()) {
			console.log(result);

			const { first_user, second_user } = req.body;
			const conversation = await Conversation.create({
				first_user,
				second_user,
			});
			res.send({ conversation });
		}
		res.send({ result });
	}
);

router
	.route('/:conversationId')
	.get(
		param('conversationId')
			.isMongoId()
			.withMessage('Please send a valid mongo id'),
		async (req: Request, res: Response) => {
			const result = validationResult(req);

			if (result.isEmpty()) {
				console.log(result);

				const { conversationId } = req.params;
				const conversation = await Conversation.findById(
					conversationId
				);
				res.send({ conversation });
			}
			res.send({ result });
		}
	)
	.delete(async (req: Request, res: Response) => {
		const conversationId = req.params.conversationId;
		await Conversation.deleteOne({ _id: conversationId });
		res.send({ result: 'Success' });
	});

router.get(
	'/user/:userId',
	param('userId').isMongoId().withMessage('Please send a valid mongo id'),
	async (req: Request, res: Response) => {
		const result = validationResult(req);

		if (result.isEmpty()) {
			console.log(result);

			const { userId } = req.params;
			const conversations = await Conversation.find({
				$or: [{ first_user: userId }, { second_user: userId }],
			});
			res.send({ conversations });
		}
		res.send({ result });
	}
);

export { router as conversationRouter };

