import { Controller, Post, Get, Body } from '@nestjs/common';
import { Family } from '../Entity/Family';
import { FamilyData } from '../types/types';
import { FamilyService } from './family.service';

@Controller('family')
export class FamilyController {
    constructor(private readonly familyService: FamilyService) {}

    @Post()
    async createFamily(@Body() familyData: FamilyData) {
        try {
            if (!familyData) {
                throw new Error('Family data not provided');
            }

            const creatingFamily = await this.familyService.createFamily(familyData);
            return { ok: true, family: creatingFamily };
        } catch (error) {
            console.error('Error creating family:', error);
            throw new Error('There was an error creating the family');
        }
    }

    @Get()
    async filterFamily(@Body() familyFilters: FamilyData) {
        try {
            const familyFiltered = await this.familyService.filterFamily(familyFilters);
            return { ok: true, family: familyFiltered };
        } catch (error) {
            console.error('Error filtering family:', error);
            throw new Error('There was an error filtering the family');
        }
    }

    
}
