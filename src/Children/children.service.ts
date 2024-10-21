import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Child } from '../Entity/Child';
import { Eps } from '../Entity/Eps';
import { Professional } from '../Entity/Professional';
import { Family } from '../Entity/Family';
import { Family_member } from '../Entity/Family_member';
import { ChildData, ChildSearchFilters, FamilyData } from '../types/types';
import { EpsService } from '../Eps/eps.service';
import { FamilyService } from '../Family/family.service';

@Injectable()
export class ChildrenService {
    constructor(
        @InjectRepository(Child)
        private childRepository: Repository<Child>,
        @InjectRepository(Professional)
        private professionalRepository: Repository<Professional>,
        @InjectRepository(Family)
        private familyRepository: Repository<Family>,
        @InjectRepository(Family_member)
        private familyMemberRepository: Repository<Family_member>,
        private epsService: EpsService,  // Inyecta el servicio eps
        private familyServices: FamilyService // Inyecta el servicio de familia
    ) {}

    public async createChild(child_data: ChildData): Promise<Child> {
        if (!child_data) {
            throw new BadRequestException('Child data was not provided');
        }

        if (!child_data.id_child) {
            throw new BadRequestException('Child id was not provided');
        }

        const child_exist = await this.childRepository.findOne({ where: { id: child_data.id_child } });
        if (child_exist) {
            throw new BadRequestException(`Child with id ${child_data.id_child} already exists`);
        }

        const eps_id = child_data.eps_id;
        if (!eps_id) {
            throw new BadRequestException('Eps id was not provided');
        }

        const eps: Eps = { id_eps: child_data.eps_id };
        const existingEps = await this.epsService.checkeps(eps);
        if (!existingEps) {
            throw new BadRequestException(`Eps with id ${child_data.eps_id} does not exist`);
        }

        if (child_data.family_id) {
            const family: FamilyData = { family_id: Number(child_data.family_id) };
            const check_family = await this.familyServices.checkFamily(family);
            if (!check_family) {
                throw new BadRequestException(`Family with id ${child_data.family_id} does not exist`);
            }

            const ChildWFamily = this.childRepository.create({
                id: child_data.id_child,
                firstname: child_data.firstname,
                lastname: child_data.lastname,
                gender: child_data.gender,
                birthday: child_data.birthday,
                status: child_data.status,
                eps: { id_eps: existingEps.id_eps },
                family: check_family,
            });
            return this.childRepository.save(ChildWFamily);
        }

        if (!child_data.family_id) {
            if (!child_data.family_type) {
                throw new BadRequestException('Family type was not provided');
            }
            if (!child_data.members_data) {
                throw new BadRequestException('Members data was not provided');
            }
            const familyData: FamilyData = {
                family_type: child_data.family_type,
                members_data: child_data.members_data,
            };
            const creatingFamily = await this.familyServices.createFamily(familyData);
            const newChild = this.childRepository.create({
                id: child_data.id_child,
                firstname: child_data.firstname,
                lastname: child_data.lastname,
                gender: child_data.gender,
                birthday: child_data.birthday,
                status: child_data.status,
                eps: { id_eps: existingEps.id_eps },
                family: creatingFamily,
            });
            return this.childRepository.save(newChild);
        }
    }

    public async updateChild(child_data: ChildData): Promise<Child> {
        if (!child_data) {
            throw new BadRequestException('Child data was not provided');
        }
        if (!child_data.id_child) {
            throw new BadRequestException('Child id was not provided');
        }
        const child_exist = await this.childRepository.findOne({ where: { id: child_data.id_child } });
        if (!child_exist) {
            throw new NotFoundException(`Child with id ${child_data.id_child} does not exist`);
        }

       //TODO: Implementar la actualización de un niño

        return child_exist;
    }

    public async deleteChild(child_data: ChildData): Promise<void> {
        if (!child_data) {
            throw new BadRequestException('Child data was not provided');
        }
        if (!child_data.id_child) {
            throw new BadRequestException('Child id was not provided');
        }
        const child_exist = await this.childRepository.findOne({ where: { id: child_data.id_child } });
        if (!child_exist) {
            throw new NotFoundException(`Child with id ${child_data.id_child} does not exist`);
        }

        await this.childRepository.delete({ id: child_data.id_child });
    }

    public async filterChildren(childFilter: ChildSearchFilters): Promise<Child[]> {
        const childQueryBuilder = this.childRepository.createQueryBuilder('child')
            .leftJoinAndSelect('child.family', 'family')
            .leftJoinAndSelect('child.eps', 'eps');

        if (childFilter.id_child) {
            childQueryBuilder.andWhere('child.id = :id', { id: childFilter.id_child });
        }
        if (childFilter.firstname) {
            childQueryBuilder.andWhere('child.firstname ILIKE :firstname', { firstname: `%${childFilter.firstname}%` });
        }
        if (childFilter.lastname) {
            childQueryBuilder.andWhere('child.lastname ILIKE :lastname', { lastname: `%${childFilter.lastname}%` });
        }
        if (childFilter.gender) {
            childQueryBuilder.andWhere('child.gender ILIKE :gender', { gender: `%${childFilter.gender}%` });
        }
        if (childFilter.eps_id) {
            childQueryBuilder.andWhere('eps.id = :eps_id', { eps_id: childFilter.eps_id });
        }
        if (childFilter.family_id) {
            childQueryBuilder.andWhere('family.id = :family_id', { family_id: childFilter.family_id });
        }
        if (childFilter.family_type) {
            childQueryBuilder.andWhere('family.family_type = :family_type', { family_type: childFilter.family_type });
        }

        return childQueryBuilder.getMany();
    }
}
