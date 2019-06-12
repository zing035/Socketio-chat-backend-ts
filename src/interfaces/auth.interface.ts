
import {Request, Response} from 'express'

export default  interface IAuth {



    signIn(req:Request, res:Response):Promise<void>
    signUp(req:Request, res:Response):Promise<void>

}