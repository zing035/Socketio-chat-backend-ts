
import { Document } from 'mongoose'

export default interface IUser extends Document {


    name: string
    lastname: string
    status: string
    email: string
    password: string  


    verifyPasswords(password : string):boolean

}