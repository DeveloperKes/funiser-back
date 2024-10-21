import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Professional } from '../entity/Professional';
import { Person } from '../entity/Person';
import { ProfessionalData } from '../types/types';

@Injectable() 
export class ProfessionalService {
    private professionalRepository: Repository<Professional>;
    private personRepository: Repository<Person>;

    constructor() {
        this.professionalRepository = AppDataSource.getRepository(Professional);
        this.personRepository = AppDataSource.getRepository(Person);
    }

    public async addProfessional(professionalData: ProfessionalData): Promise<Professional> {
        const existingPerson = await this.personRepository.findOneBy({ id_person: professionalData.professional_id });
        if (!existingPerson) {
            throw new Error(`Person with id ${professionalData.professional_id} does not exist`);
        }

        const existingProfessional = await this.professionalRepository.findOneBy({ professional_id: professionalData.professional_id });
        if (existingProfessional) {
            throw new Error(`Professional with id ${professionalData.professional_id} already exists`);
        }

        const newProfessional = this.professionalRepository.create(professionalData);
        await this.professionalRepository.save(newProfessional);

        return newProfessional;
    }
}
