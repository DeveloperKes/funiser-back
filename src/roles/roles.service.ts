import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Role } from '../entity/Role';
import { Person } from '../entity/Person';

@Injectable()
export class RolesService {
    private rolesRepository: Repository<Role>;
    private personRepository: Repository<Person>;

    constructor() {
        this.rolesRepository = AppDataSource.getRepository(Role);
        this.personRepository = AppDataSource.getRepository(Person);
    }

    async addRole(role: string, id_role: string): Promise<Role> {
        try {
            const existingRole = await this.rolesRepository.findOne({
                where: { role, id_role },
                relations: ['persons'],
            });

            if (existingRole) {
                return existingRole;
            }

            const newRole = this.rolesRepository.create({ role, id_role });
            return await this.rolesRepository.save(newRole);
        } catch (error) {
            console.error('Error adding role:', error);
            throw new Error('Error adding role');
        }
    }

    async updateUserRoles(personId: string, roleNames: string[]): Promise<Person | null> {
        try {
            const person = await this.personRepository.findOne({
                where: { id_person: personId },
                relations: ['roles'],
            });

            if (!person) {
                throw new Error(`Person with id ${personId} not found`);
            }

            const updatedRoles: Role[] = [];
            for (const roleName of roleNames) {
                let role = await this.rolesRepository.findOne({ where: { role: roleName } });
                if (!role) {
                    role = this.rolesRepository.create({ role: roleName });
                    role = await this.rolesRepository.save(role);
                }
                updatedRoles.push(role);
            }

            person.roles = updatedRoles;
            await this.personRepository.save(person);
            return person;
        } catch (error) {
            console.error('Error updating user roles:', error);
            throw new Error('Error updating user roles');
        }
    }

    async deleteRole(roleId: string): Promise<void> {
        if (roleId === '1') {
            throw new Error('Cannot delete the default role');
        }

        try {
            const role = await this.rolesRepository.findOne({ where: { id_role: roleId } });
            if (!role) {
                throw new Error('Tried to delete a non-existent role');
            }
            await this.rolesRepository.remove(role);
        } catch (error) {
            console.error('Error deleting role:', error);
            throw new Error('Error deleting role');
        }
    }
}
