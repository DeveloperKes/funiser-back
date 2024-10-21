import { Injectable } from '@nestjs/common';
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Family } from "../Entity/Family";
import { FamilyData } from "../types/types";
import { Family_member } from "../Entity/Family_member";

@Injectable()
export class FamilyService {
    private familyRepository: Repository<Family>;
    private familyMemberRepository: Repository<Family_member>;

    constructor() {
        this.familyRepository = AppDataSource.getRepository(Family);
        this.familyMemberRepository = AppDataSource.getRepository(Family_member);
    }

    public async checkFamily(familyData: FamilyData): Promise<Family> {
        if (!familyData) {
            throw new Error('Family data was not provided');
        }

        if (!familyData.family_id) { 
            throw new Error('Family id was not provided');
        }

        const existentFamily = await this.familyRepository.findOne({ where: { id: Number(familyData.family_id) } });

        if (!existentFamily) {
            throw new Error(`Family with id ${familyData.family_id} does not exist`);
        }

        return existentFamily;
    }

    public async createFamily(familyData: FamilyData): Promise<Family> {
        if (!familyData) {
            throw new Error('Family data was not provided');
        }

        const newFamily = this.familyRepository.create({
            family_type: familyData.family_type ? Number(familyData.family_type) : 1,
            members: familyData.members_data?.map(memberData => {
                return this.familyMemberRepository.create({
                    ...memberData,
                });
            }) || [],
        });

        if (!newFamily) {
            throw new Error('Family could not be created');
        }
        
        const createdFamily = await this.familyRepository.save(newFamily);
        return createdFamily;
    }

    public async filterFamily(familyData: FamilyData) {
        //TODO: Implement filterFamily
        console.log("Not implemented");
    }
}
