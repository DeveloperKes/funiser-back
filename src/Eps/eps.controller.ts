import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { EpsService } from '../Eps/eps.service'; 
import { Eps } from '../Entity/Eps';
import { epsData, epsSearchFilters } from '../types/types';

@Controller('eps') 
export class EpsController {
    constructor(private readonly epsService: EpsService) {}

    @Post()
    async createEps(@Body() epsData: epsData) {
        try {
            if (!epsData) {
                throw new Error('Eps data not provided');
            }

            const creatingEps = await this.epsService.checkeps(epsData as Eps);
            return { ok: true, eps: creatingEps };

        } catch (error) {
            console.error('Error creating eps:', error);
            throw new Error('There was an error creating the eps');
        }
    }

    @Get()
    async filterEps(@Body() epsSearchFilters: epsSearchFilters) {
        try {
            if (!epsSearchFilters) {
                return { ok: false, message: 'No search parameters provided' };
            }

            const filtering = await this.epsService.filterEps(epsSearchFilters);
            if (filtering.length === 0) {
                return { ok: false, message: 'No eps found by the provided parameters' };
            }

            return filtering.map(eps => ({
                id_eps: eps.id_eps,
                name: eps.name,
            }));

        } catch (error) {
            console.error(error);
            throw new Error('Error fetching eps');
        }
    }

    @Put(':id_eps') 
    async updateEps(@Param('id_eps') id_eps: string, @Body() epsData: epsData) {
        try {
            if (!epsData) {
                throw new Error('No eps data provided');
            }

            const updatingEps = await this.epsService.updateEps({ ...epsData, id_eps: Number(id_eps) }); 

            return { ok: true, message: 'Eps updated successfully' };

        } catch (error) {
            console.error('Error updating eps:', error);
            throw new Error('There was an error updating the eps');
        }
    }

    @Delete(':id_eps')
    async deleteEps(@Param('id_eps') id_eps: string) {
        try {
            const deletedEps = await this.epsService.deleteEps({ id_eps: Number(id_eps) }); 
            if (!deletedEps) {
                return { ok: false, message: 'Eps not found' };
            }

            return { ok: true, message: 'Eps deleted successfully' };

        } catch (error) {
            console.error(error);
            throw new Error('There was an error deleting the eps');
        }
    }
}
