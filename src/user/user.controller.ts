import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { UserInfo, userSearchFilters } from '../types/types';
import { User } from '../entity/User';
import { Token } from '../entity/Token';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async createUser(@Req() req: Request, @Res() res: Response) {
        const { id_person, username, email, password, firstname, lastname, phonenumber, secondaryphone } = req.body;

        if (!id_person || !username || !email || !firstname || !lastname || !password || !phonenumber) {
            return res.status(400).json({ ok: false, message: 'Missing required parameters.' });
        }

        try {
            const newUser = await this.userService.createUser({
                id_person,
                username,
                email,
                password,
                firstname,
                lastname,
                phonenumber,
                secondaryphone,
            });

            return res.status(201).json({ ok: true, msg: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ ok: false, msg: 'Error creating user' });
        }
    }

    @Post('login')
    async loginUser(@Req() req: Request, @Res() res: Response) {
        const { email, password } = req.body;

        try {
            const loginResponse = await this.userService.loginUser(email, password);
            return res.status(200).json(loginResponse);
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ ok: false, msg: 'Error logging in user' });
        }
    }

    @Get('profile')
    async getProfile(@Req() req: Request, @Res() res: Response) {
        try {
            const email = req.user?.email;
            if (!email) {
                return res.status(400).json({ ok: false, msg: 'Email not provided' });
            }

            const userProfile = await this.userService.getProfile(email);
            if (!userProfile) {
                return res.status(404).json({ ok: false, msg: 'User not found' });
            }

            return res.status(200).json({ ok: true, user: userProfile });
        } catch (error) {
            console.error('Error fetching profile:', error);
            return res.status(500).json({ ok: false, msg: 'Error fetching profile' });
        }
    }

    @Post('search')
    async searchUsers(@Req() req: Request, @Res() res: Response) {
        try {
            const filter: userSearchFilters = req.body;
            const users = await this.userService.findByFilter(filter);

            if (users.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }

            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Search error', error });
        }
    }

    @Put(':id_person/update')
    async updateUser(@Param('id_person') id_person: string, @Body() updateData: any, @Res() res: Response) {
        try {
            const updatedUser = await this.userService.updateUser(id_person, updateData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User updated successfully', updatedUser });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user', error });
        }
    }

    @Delete(':id_person/soft-delete')
    async softDelete(@Param('id_person') id_person: string, @Res() res: Response) {
        try {
            const deletedPerson = await this.userService.softDeleteUser(id_person);
            if (!deletedPerson) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting user', error });
        }
    }

    @Delete(':id_person/delete')
    async definitiveDelete(@Param('id_person') id_person: string, @Res() res: Response) {
        console.log("Erasing user definitively...");
        // Implement the logic for definitive deletion.
    }
}
