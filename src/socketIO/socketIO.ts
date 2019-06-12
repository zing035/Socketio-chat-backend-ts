import { Socket } from 'socket.io';

import socketIO from 'socket.io';

// For configs
import { UserSocketList } from '../classes/userList.socket';
import { UserSocketIO } from '../classes/user.socket';
import { Server } from '../classes/server';


export const userList = new UserSocketList();

export const disconnectDevice =  (device:Socket) => {


     device.on('disconnect', ()=> {

        console.log('Device disconnected:', device.id)
        userList.deleteUser(device.id);

    });
    
}


// < ! - - - - - - user config - - - - - - ! > //

export const onSignIn = (device: Socket) => {

    device.on('signIn', (user: any)=> {

        console.log('recibido',user);
        const userSocket = new UserSocketIO(device.id, user.name.concat(' ' + user.lastname), user._id);
        // device.join(userSocket.room);
        // console.log(user);
        userList.addUser(userSocket);

        // device.in('hola').broadcast.emit('message',{message:'hi madafakaaa'});

        // console.log('room users',userList.getUsersByRoom('hola'));

    });

}


export const onMessengerEnteredAndLeave = (device: Socket) => {
 
    device.on('messenger-entered', (messengerId) =>{

        device.join(messengerId);
        console.log('User has  entered to this messenger', messengerId);
    });

    device.on('messenger-leave', (messengerId) => {

        device.leave(messengerId)
        console.log('User has  leave  this messenger', messengerId);


    });
    
}


export const onSignOut = (device: Socket) => {

    device.on('signOut', (user: UserSocketIO)=> {

        console.log('user just signOut', device.id);
        userList.deleteUser(device.id);
    });

}