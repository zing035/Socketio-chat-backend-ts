import { UserSocketIO } from "./user.socket";

export class UserSocketList{


    public userList: UserSocketIO[] = [];

    constructor(){

    }

    public addUser(user: UserSocketIO){
        this.userList.push(user);

        console.log(this.userList);
        return user;
    }

    
    public get getUserList(){

        return this.userList;

    }

    public getUsersByRoom(room: string){
        return this.userList.filter(users => users.room === room);
    }

    public getUser(id:string){

        return this.userList.find(user => user.socketId === id);

    }


    public getUserByMongoId(id:string){
        return this.userList.find(user=> user.mongoId == id);
    }

    public deleteUser(id:string){

        const tempUser = this.getUser(id);

        this.userList = this.userList.filter(user => user.socketId != id);
        
        console.log(this.userList);
        return tempUser;

    }

}