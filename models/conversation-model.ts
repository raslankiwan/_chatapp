import mongoose from 'mongoose';
import { User } from './user-model';

const conversationSchema = new mongoose.Schema(
	{
		first_user: {
			type: mongoose.Schema.Types.ObjectId,
            required: true,
			ref: User,
		},
		second_user: {
			type: mongoose.Schema.Types.ObjectId,
            required: true,
			ref: User,
		},
		archived: {
			type: mongoose.Schema.Types.Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export const Conversation = mongoose.model('conversation', conversationSchema);

