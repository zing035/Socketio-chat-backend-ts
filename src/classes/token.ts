import { SEED } from "../global/environments";
import jwt from 'jsonwebtoken'



export default class Token {


    private static SEED: string = SEED;
    private static expiresIn: string = '30d';


    public static signJWT(payload: any): string {

        return jwt.sign({ user: payload }, this.SEED, { expiresIn: this.expiresIn });

    }

    public static verifyJWT(token: string): Promise<any> {

        return new Promise((resolve, reject) => {


            jwt.verify(token, this.SEED, (err, decoded) => {

                if (err) {
                    reject();
                } else {
                    resolve(decoded);
                }

            });


        });

    }




}