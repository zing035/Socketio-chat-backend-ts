

export class UserSocketIO{

    public socketId: string;
    public fullName: string;
    public mongoId: string;
    public room: string;
    constructor(id: string, fullName: string, mongoId: string, room?: string){

        this.socketId = id;
        this.mongoId = mongoId;
        this.fullName = fullName;
        this.room = room || 'undefined';

    }

}