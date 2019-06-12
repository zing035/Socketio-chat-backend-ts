
import {Request, Response} from 'express'

export default interface UserDao {

     findAllUsers(req: Request, res:Response): Promise<void>;
     findUserById(req: Request, res:Response): Promise<void>;
     insertUser(req: Request, res:Response): Promise<void>;
     updateUserById(req: Request, res:Response): Promise<void>;
     deleteUserById(req: Request, res:Response): Promise<void>;
}