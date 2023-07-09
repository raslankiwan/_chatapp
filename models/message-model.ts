import mongoose from 'mongoose';
import { User } from './user-model';
import { Conversation } from './conversation-model';

const messageSchema = new mongoose.Schema(
	{
		value: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
            required: true,
			ref: User,
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
            required: true,
			ref: User,
		},
		seen: {
			type: mongoose.Schema.Types.Boolean,
			default: false,
		},
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
			ref: Conversation,
        }
	},
	{
		timestamps: true,
	}
);

export const Message = mongoose.model('message', messageSchema);
