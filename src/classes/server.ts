
// Express
import express from 'express'

// Http
import http from 'http';

// Mongoose
import mongoose from 'mongoose';


// GLOBALS
import { SERVER_PORT } from "../global/environments";

// SocketIo
import socketIO from 'socket.io';

// Cors
import cors from 'cors';

// socketIO Methdos

import { disconnectDevice, onSignIn, onMessengerEnteredAndLeave, onSignOut } from '../socketIO/socketIO'
import { USER_ROUTES } from '../routes/user.routes';
import { CHAT_ROUTES} from '../routes/chat.routes';
import { AUTH_ROUTES } from '../routes/auth.routes';

// Routes

export class Server {

    private static instance: Server
    app: express.Application;
    port: number;
    httpServer: http.Server;
    socketIo: socketIO.Server

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.socketIo = socketIO(this.httpServer);

        this.connecToDatabase();
        this.loadMiddlewares();
        this.sockets();
        this.routes();
    }

    private connecToDatabase() {

        const mongoURI: string = 'mongodb://localhost/socketiochat';

        mongoose.set('useFindAndModify', true)
        mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true }).then(response => {

            console.log('Database connected successfuly on port:', response.get('port'))


        }).catch(error => console.log(error));

    }

    private loadMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ origin: true, credentials: true }))
    }

    public static get Instance() {

        return this.instance || (this.instance = new this());
    }


    start() {
        this.httpServer.listen(this.port, () => {

            console.log('Server listening on port:' + this.port);
        });
    }

    private routes(){

        this.app.use('/api', USER_ROUTES);
        this.app.use('/api', CHAT_ROUTES);
        this.app.use('/api', AUTH_ROUTES);

    }

    private sockets() {

        this.socketIo.on('connection', device => {

        
            console.log('device conected succesfully!', device.id);
            
            // On signIn
            onSignIn(device);

            onSignOut(device);
            // On disconnection
            disconnectDevice(device);

            // On enter in a messenger
            onMessengerEnteredAndLeave(device);
        });

    }
}