import { Module } from '@nestjs/common';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

@Module({
    controllers: [ProfessionalController],
    providers: [ProfessionalService],
    exports: [ProfessionalService]
})
export class ProfessionalModule { }
