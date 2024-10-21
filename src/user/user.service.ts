import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from '../entity/Person';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { userSearchFilters } from '../types/types';
import bcrypt from 'bcrypt';
import { Token } from 'src/Entity/Token';
import jwt, { Secret } from 'jsonwebtoken'

@Injectable()
export class UserService {
    private personRepository: Repository<Person>;
    private userRepository: Repository<User>;
    private tokenRepository: Repository<Token>;

    constructor() {
        this.personRepository = AppDataSource.getRepository(Person);
        this.userRepository = AppDataSource.getRepository(User);
        this.tokenRepository = AppDataSource.getRepository(Token);
    }

    async findByFilter(filter: userSearchFilters): Promise<Person[]> {
        const queryBuilder = this.personRepository.createQueryBuilder('person')
            .leftJoinAndSelect('person.user', 'user');

        let hasFilter = false;

        if (filter.username) {
            queryBuilder.andWhere('user.username ILIKE :username', { username: `%${filter.username}%` });
            hasFilter = true;
        }

        if (filter.id_person) {
            queryBuilder.andWhere('person.id_person ILIKE :id_person', { id_person: `%${filter.id_person}%` });
            hasFilter = true;
        }

        if (filter.firstname) {
            queryBuilder.andWhere('person.firstname ILIKE :firstname', { firstname: `%${filter.firstname}%` });
            hasFilter = true;
        }

        if (filter.lastname) {
            queryBuilder.andWhere('person.lastname ILIKE :lastname', { lastname: `%${filter.lastname}%` });
            hasFilter = true;
        }

        if (filter.email) {
            queryBuilder.andWhere('user.email = :email', { email: filter.email });
            hasFilter = true;
        }

        if (filter.phone) {
            queryBuilder.andWhere('person.phonenumber ILIKE :phone', { phone: `%${filter.phone}%` });
            hasFilter = true;
        }

        if (!hasFilter) {
            return [];
        }

        return queryBuilder.getMany();
    }


    async loginUser(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['person', 'person.roles'],
        });

        if (!user) {
            return { ok: false, msg: 'User not found' };
        }

        if (password === undefined || password === null || user.password === undefined || user.password === null) {
            return { ok: false, msg: 'Password is missing.' };
        }

        const MATCH = await bcrypt.compare(password, user.password);
        const roles = user.person?.roles;

        if (!MATCH) {
            return { ok: false, msg: 'Invalid credentials.' };
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRETKEY as Secret, { expiresIn: "4h" });

        await this.tokenRepository.delete({ user: user });

        const newToken = this.tokenRepository.create({ token, user });

        if (newToken.token) {
            const salt = await bcrypt.genSalt(10);
            const hashedToken = await bcrypt.hash(newToken.token, salt);
            newToken.hashedtoken = hashedToken;
            await this.tokenRepository.save(newToken);

            return {
                ok: true,
                id_person: user.person?.id_person,
                user: user.username,
                email: user.email,
                firstname: user.person?.firstname,
                lastname: user.person?.lastname,
                roles: roles?.map(role => role.role),
                hashedToken
            };
        }

        return { ok: false, msg: 'Failed to create token.' };
    }

    async createUser(userInfo: {
        id_person: string;
        username: string;
        email: string;
        password: string;
        firstname: string;
        lastname: string;
        phonenumber: string;
        secondaryphone?: string;
    }): Promise<User> {
        const { id_person, username, email, password, firstname, lastname, phonenumber, secondaryphone } = userInfo;
        
        const user = this.userRepository.create({ username, email, password: await bcrypt.hash(password, 10) });
        const person = this.personRepository.create({ id_person, firstname, lastname, phonenumber, secondaryphone, user });

        await this.userRepository.save(user);
        await this.personRepository.save(person);

        return user;
    }

    async updateUser(id_person: string, updateData: {
        username?: string;
        email?: string;
        password?: string;
        personData?: {
            firstname?: string;
            lastname?: string;
            phonenumber?: string;
            secondaryphone?: string;
        };
    }): Promise<Person> {
        try {
            const person = await this.personRepository.findOne({
                where: { id_person },
                relations: ['user'],
            });

            if (!person || !person.user) {
                throw new Error(`Person with ${id_person} not found`);
            }

            const user = person.user;
            if (updateData.username) user.username = updateData.username;
            if (updateData.email) user.email = updateData.email;
            if (updateData.password) user.password = await bcrypt.hash(updateData.password, 10);
            await this.userRepository.save(user);

            if (updateData.personData) {
                if (updateData.personData.firstname) person.firstname = updateData.personData.firstname;
                if (updateData.personData.lastname) person.lastname = updateData.personData.lastname;
                if (updateData.personData.phonenumber) person.phonenumber = updateData.personData.phonenumber;
                if (updateData.personData.secondaryphone) person.secondaryphone = updateData.personData.secondaryphone;
                await this.personRepository.save(person);
            }

            return person;
        } catch (error) {
            console.error('Error updating user in service:', error);
            throw new Error('Error updating user');
        }
    }

    async softDeleteUser(id_person: string): Promise<Person | null> {
        try {
            const person = await this.personRepository.findOne({
                where: { id_person },
                relations: ['user'],
            });
            if (!person) {
                throw new Error(`Person with ${id_person} not found`);
            }
            person.deletedAt = new Date();      

            if (person.user) {
                person.user.deletedAt = new Date();
                await this.userRepository.save(person.user);
            }

            await this.personRepository.save(person);
            return person;
        } catch (error) {
            console.error('Error during soft delete:', error);
            throw new Error('Error during soft delete');
        }
    }

    async getProfile(email: string): Promise<User | null> {
        if (!email) {
            throw new Error('Email not provided');
        }

        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
}
