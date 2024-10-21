import { Controller, Post, Delete, Put, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { RolesService } from '../roles/roles.service';

@Controller('roles') 
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    async createRole(@Body() body: { new_role: string; id_role: string }, @Res() res: Response) {
        const { new_role, id_role } = body;

        try {
            if (!new_role || !id_role) {
                return res.status(HttpStatus.BAD_REQUEST).json({ ok: false, message: 'Role name and id are required.' });
            }

            const add_new_role = await this.rolesService.addRole(new_role, id_role);

            return res.status(HttpStatus.CREATED).json({
                ok: true,
                message: 'Role created successfully.',
                role: add_new_role,
            });
        } catch (error) {
            console.error('Error creating role', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Something went wrong creating role',
            });
        }
    }

    @Delete(':roleId')
    async deleteRole(@Param('roleId') roleId: string, @Res() res: Response) {
        try {
            await this.rolesService.deleteRole(roleId);
            return res.status(HttpStatus.OK).json({ ok: true, message: 'Role deleted successfully' });
        } catch (error) {
            console.error('Error deleting role', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ ok: false, message: 'Something went wrong deleting role' });
        }
    }

    @Put(':person_id/roles')
    async updateUserRoles(@Param('person_id') person_id: string, @Body() body: { new_roles: string[] }, @Res() res: Response) {
        const { new_roles } = body;

        if (!new_roles || !Array.isArray(new_roles) || new_roles.length === 0) {
            return res.status(HttpStatus.BAD_REQUEST).json({ ok: false, message: 'No roles provided to add' });
        }

        try {
            const updatedPerson = await this.rolesService.updateUserRoles(person_id, new_roles);
            if (!updatedPerson) {
                return res.status(HttpStatus.NOT_FOUND).json({ ok: false, message: `Person with id ${person_id} not found` });
            }

            return res.status(HttpStatus.OK).json({ ok: true, message: 'User roles updated successfully', person: updatedPerson });
        } catch (error) {
            console.error('Failed to update user roles', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ ok: false, message: 'Failed to update user roles', error });
        }
    }
}
