
import { Schema, model } from 'mongoose'


const ChatSchema = new Schema({

    participants: [{ type: Schema.Types.ObjectId, ref:'user'}],
    lastMessage: {type: Schema.Types.ObjectId, required:false, ref:'message'}
});



export const chatSchema = model('chat', ChatSchema);