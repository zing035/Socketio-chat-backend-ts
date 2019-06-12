
import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'
import IUser from '../interfaces/userModel.interface';

import uniqueValidator from "mongoose-unique-validator";
const USER_SCHEMA = new Schema({

    name: {type: String, required:[true, 'Name must be provided']},
    lastname: {type: String, required:[true, 'lastname must be provided']},
    status: {type: String, required: false, default: 'Hello world!'},
    email: {type: String, required:[true, 'email must be provided'], unique:[true, 'email must be Unique']},
    password: {type: String, required:[true, 'password must be provided']},
    skills: [ {
        skill: {type: String, required:false},
        icon: {type: String, required:false},
        percentage: {type: Number, required:false, max: 1}
    }]
});

USER_SCHEMA.plugin(uniqueValidator, {message: 'Error, {PATH} already exists'});


USER_SCHEMA.method('verifyPasswords', function(password: string = ''): boolean {

    if(bcrypt.compareSync(password, this.password)){

        return true
    }else{
        return false;
    }

})

export const USER_DB = model<IUser>('user', USER_SCHEMA);