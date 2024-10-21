import { Controller, Post, Body } from '@nestjs/common';
import { ProfessionalService } from '../professional/professional.service';
import { ProfessionalData } from '../types/types';

@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) {}

    @Post()
    async createProfessional(@Body() professionalData: ProfessionalData) {
        try {
            if (!professionalData) {
                return { ok: false, message: 'Professional data is missing' };
            }

            const newProfessional = await this.professionalService.addProfessional(professionalData);
            return { ok: true, professional: newProfessional };
        } catch (error) {
            console.error('Error creating professional:', error);
            throw new Error('Error while creating a new professional: ' + error);
        }
    }

    
}
