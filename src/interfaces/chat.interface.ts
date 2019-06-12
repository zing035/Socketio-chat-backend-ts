
import {Request, Response} from 'express'

export default interface ChatDao {

     findAllChats(req: Request, res:Response): Promise<void>;
     findChatByUserId(req: Request, res:Response): Promise<void>;
     insertChat(req: Request, res:Response): Promise<void>;
     updateChatById(req: Request, res:Response): Promise<void>;
     deleteChatById(req: Request, res:Response): Promise<void>;
}