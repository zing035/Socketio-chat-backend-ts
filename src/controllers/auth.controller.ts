import IAuth from "../interfaces/auth.interface";
import Token from "../classes/token";
import { USER_DB } from "../models/user.schema";
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
class AuthController implements IAuth {





    public async signIn(req: Request, res: Response): Promise<void> {


        const { email, password } = req.body;

        try {
            const user = await USER_DB.findOne({ email: email });

            // If user means that at least one user exist
            if (user) {

                const isEqual = user.verifyPasswords(password);

                if (isEqual) {
                    user['password'] = ':)';
                    const signedToken = Token.signJWT(user);
                    res.status(200).json({ Token: signedToken, ok: true })
                } else {
                    res.status(401).json({ error: 'invalid email/password', ok: false });
                }

            } else {
                res.status(404).json({ error: 'User does not exist on the Database', ok: false });
            };
        } catch (error) {
            res.status(400).json({ error: error, ok: false });
        }

    }


    public async isAuth(req: any, res: Response): Promise<void>{


        if(req.user){
            res.status(200).json({User: req.user, ok:true, isAuth: true});
        }else{
            res.status(401).json({error: 'User is not Authenticated', ok:false, isAuth: false});
        }

    }


    public async signUp(req: Request, res: Response): Promise<void> {
        const { name, lastname, email } = req.body;

        let { password } = req.body;
        password = bcrypt.hashSync(password, 10);

        try {
            const newUser = await USER_DB.create(new USER_DB({ name, lastname, email, password }));
            res.status(201).json({ User: newUser, ok: true })
        } catch (error) {
            res.status(400).json({ error: error.errors, ok: false });
        }
    }


}

export const AUTH_CONTROLLER = new AuthController();