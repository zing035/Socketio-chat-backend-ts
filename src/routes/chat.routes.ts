
import {Router} from 'express'
import { CHAT_CONTROLLER } from '../controllers/chat.controller';
import { isAuthenticated } from '../middlewares/middlewares';

 class UserRoutes {


    chat_router: Router

    constructor(){

        this.chat_router = Router();
        this.messengerRoutes();
    }

    private messengerRoutes(){

        this.chat_router.get('/messengers',[isAuthenticated], CHAT_CONTROLLER.findAllChats)
        this.chat_router.get('/messengers/:id',[isAuthenticated], CHAT_CONTROLLER.findChatByUserId)
        this.chat_router.get('/messengers/:id/messages',[isAuthenticated], CHAT_CONTROLLER.findAllMessagesByChat)
        this.chat_router.post('/messengers', [isAuthenticated], CHAT_CONTROLLER.insertChat)
        this.chat_router.post('/messengers/messages', [isAuthenticated], CHAT_CONTROLLER.sendMessage)
        this.chat_router.put('/messengers/:id',[isAuthenticated], CHAT_CONTROLLER.updateChatById),
        this.chat_router.delete('/messengers/:id',[isAuthenticated], CHAT_CONTROLLER.deleteChatById)

    }

}

export const CHAT_ROUTES = new UserRoutes().chat_router;