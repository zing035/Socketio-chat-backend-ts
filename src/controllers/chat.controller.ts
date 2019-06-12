import { Request, Response } from 'express'
import { chatSchema } from '../models/chat.schema';
import { messageSchema } from '../models/message.schema';
import { Server } from '../classes/server';
import { isNullOrUndefined } from 'util';
import ChatDao from '../interfaces/chat.interface';


class ChatController implements ChatDao {


    public async findAllChats(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async findChatByUserId(req: Request, res: Response): Promise<void> {

        // User id 
        const { id } = req.params;
        try {
            const messenger = await chatSchema.find({ participants: id }).populate('lastMessage participants');


            res.status(200).json({ Messengers: messenger, ok: true })


        } catch (error) {
            res.status(400).json({ error: error, ok: false })
        }

    }

    public async insertChat(req: any, res: Response): Promise<any> {

        // Participant
        const { participantId } = req.body;

        // If the user has not selected any participants
        if (!participantId) {
            return res.status(422).json({ error: 'Please provide a participant', ok: false });
        }

        try {

            // Verify that a conversation does not exist
            const exists = await chatSchema.findOne({ participants: [req.user._id, participantId] }).populate('participants');
            if (!isNullOrUndefined(exists)) {

                return res.status(200).json({ Message: 'Conversation Already exists', Messenger: exists, ok: true, exists: true })

            }

            // Create conversation if it does not exists
            const newMessenger = new chatSchema({
                participants: [req.user._id, participantId]
            });

            // const promises = await Promise.all([])
            const messenger =  await chatSchema.create(newMessenger);
            const sendMessenger =  await chatSchema.findById(messenger._id).populate('participants');


            if (!isNullOrUndefined(messenger) && !isNullOrUndefined(sendMessenger)) {
                return res.status(201).json({ Message: 'Conversation created successfully', Messenger: sendMessenger, ok: true })
            }
        } catch (error) {
            return res.status(400).json({ error: error, ok: false })
        }


    }


    public async updateChatById(req: Request, res: Response): Promise<void> {

        const { id } = req.params;
        const { messageId } = req.body;


        try {
            const messenger = await chatSchema.findByIdAndUpdate(id, { lastMessage: messageId }, { new: true }).populate('lastMessage')
            res.status(200).json({ Messenger: messenger, ok: true })
        } catch (error) {
            res.status(400).json({ error: error, ok: false })

        }

    }

    public async deleteChatById(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }


    // < ! - - - - - - Messages - - - - - -  ! > 

    public async findAllMessagesByChat(req: Request, res: Response): Promise<void> {

        // Pagination properties

        const page: number = Number(req.query.page) || 1;
        let pageSize: number;
        let totalMessages: number;

        let skipMessages: number = (page - 1) * 10;

        // Conversation - messenger id
        const { id } = req.params;

        try {

            const messages = await messageSchema.find({ 'messengerId': id })
                .sort('-createdAt')
                .limit(10)
                .skip(skipMessages)
                .populate('author messengerId', 'name lastname');
            totalMessages = await messageSchema.countDocuments();
            pageSize = messages.length;

            // Verify that we have messages in a conversation
            res.status(200).json({ Messages: messages, page, pageSize, totalMessages, ok: true })

        } catch (error) {
            res.status(400).json({ error: error, ok: false })

        }

    }

    public async sendMessage(req: any, res: Response): Promise<void> {

        const server = Server.Instance;
        const { messageBody } = req.body;

        try {

            const message = new messageSchema({
                messengerId: messageBody.messengerId,
                body: messageBody.body,
                author: req.user._id
            })
            const newMessage = await messageSchema.create(message);

            const messageToSend = await messageSchema.findOne({ _id: newMessage._id }).populate('author', 'name lastname')

            server.socketIo.in(messageBody.messengerId).emit('new-message', messageToSend);
            res.status(201).json({ newMessage, Message: 'Message created succesfully', ok: true });


        } catch (error) {
            res.status(400).json({ error: error, ok: false });

        }

    }



}

export const CHAT_CONTROLLER = new ChatController();