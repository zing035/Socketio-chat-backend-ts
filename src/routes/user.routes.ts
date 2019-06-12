
import {Router} from 'express'
import { USER_CONTROLLER } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/middlewares';

 class UserRoutes {


    user_router: Router

    constructor(){

        this.user_router = Router();
        this.userRoutes();
    }

    private userRoutes(){

        this.user_router.get('/users',[isAuthenticated],USER_CONTROLLER.findAllUsers)
        this.user_router.get('/users/:id',[isAuthenticated], USER_CONTROLLER.findUserById)
        this.user_router.post('/users',[isAuthenticated], USER_CONTROLLER.insertUser)
        this.user_router.put('/users/:id',[isAuthenticated], USER_CONTROLLER.updateUserById),
        this.user_router.delete('/users/:id',[isAuthenticated], USER_CONTROLLER.deleteUserById)

    }

}

export const USER_ROUTES = new UserRoutes().user_router;