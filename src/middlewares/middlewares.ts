import { Request, Response, NextFunction } from "express";
import Token from "../classes/token";


export const isAuthenticated = (req: any, res:Response, next:NextFunction) => {


    const token = String(req.headers.authorization) || '';

    Token.verifyJWT(token).then(response => {

        if(response){
            req.user = response.user;
            next();
        }

    }).catch(error => {

        res.status(401).json({error: error, errorMessage: 'UNAUTHORIZED', ok: false});

    })



}