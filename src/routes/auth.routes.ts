
import {Router} from 'express'
import { AUTH_CONTROLLER } from '../controllers/auth.controller';
import { isAuthenticated } from '../middlewares/middlewares';

 class AuthRoutes {


    aut_router: Router

    constructor(){

        this.aut_router = Router();
        this.authRoutes();
    }

    private authRoutes(){

       this.aut_router.post('/auth', AUTH_CONTROLLER.signIn);
       this.aut_router.get('/auth/Authorization',[isAuthenticated] ,AUTH_CONTROLLER.isAuth);
       this.aut_router.post('/auth/signup', AUTH_CONTROLLER.signUp);

    }

}

export const AUTH_ROUTES = new AuthRoutes().aut_router;