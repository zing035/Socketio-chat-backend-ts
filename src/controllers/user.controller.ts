

/**
 * Class to handle request on user Routes
 */

import { Request, Response } from 'express'
import UserDao from '../interfaces/user.interface';
import { USER_DB } from '../models/user.schema';
import bcrypt from 'bcrypt'

class UserController implements UserDao {


    public async findAllUsers(req: any, res: Response): Promise<void> {


        const page: number = Number(req.query.page) || 1;
        let pageSize: number;
        let totalUsers: number;

        console.log(req.user);
        let skipUsers: number = (page - 1) * 20;

        try {
            // Nin means !=
            const users = await USER_DB.find({_id: {$nin: req.user._id}})
                            .limit(20)
                            .skip(skipUsers);
                            pageSize = users.length;
                            totalUsers = await USER_DB.countDocuments();


            res.status(200).json({ Users: users, ok: true, pageSize, totalUsers, page });

        } catch (error) {
            res.status(400).json({ error: error, ok: false });
        }
    }

    public async findUserById(req: Request, res: Response): Promise<void> {

        const { id } = req.params;

        console.log(id);
        try {

            const user = await USER_DB.findById(id).populate('messenger');

            res.status(200).json({ User: user, ok: true })

        } catch (error) {
            res.status(400).json({ error: error, ok: false });

        }

    }

    public async insertUser(req: Request, res: Response): Promise<void> {

        const { name, lastname, email } = req.body;

        let { password } = req.body;
        password = bcrypt.hashSync(password, 10);

        try {
            const newUser = await USER_DB.create(new USER_DB({ name, lastname, email, password }));

            res.status(201).json({ User: newUser, ok: true })
        } catch (error) {
            res.status(400).json({ error: error, ok: false });
        }
    }


    public async updateUserById(req: Request, res: Response): Promise<void> {

        const { id } = req.params;

        try {
            const user = await USER_DB.findByIdAndUpdate(id,req.body, {new:true});
            res.status(200).json({ User: user, ok: true })
        } catch (error) {
            res.status(400).json({ error: error, ok: false });

        }
    }

    public async deleteUserById(req: Request, res: Response): Promise<void> {

        const { id } = req.params;

        try {
            const user = await USER_DB.findByIdAndDelete(id);
            res.status(200).json({ User: user, ok: true })
        } catch (error) {
            res.status(400).json({ error: error, ok: false });

        }

    }
}

export const USER_CONTROLLER = new UserController();