import { model, Schema } from 'mongoose';

const MessageSchema = new Schema({

    messengerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'chat'
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

}, {timestamps: true});

export const messageSchema = model('message', MessageSchema);