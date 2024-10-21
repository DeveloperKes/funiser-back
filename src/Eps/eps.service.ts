import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Eps } from '../Entity/Eps';
import { epsSearchFilters } from '../types/types';

@Injectable()
export class EpsService {
    constructor(
        @InjectRepository(Eps) 
        private readonly epsRepository: Repository<Eps>,
    ) {}

    public async checkeps(epsData: Eps): Promise<Eps> {
        const epsExist = await this.epsRepository.findOne({ where: { id_eps: epsData.id_eps } });

        if (!epsExist) {
            throw new NotFoundException(`Eps with id ${epsData.id_eps} does not exist`);
        }

        return epsExist;
    }

    public async filterEps(epsSearchFilters: epsSearchFilters): Promise<Eps[]> {
        const checkparams = epsSearchFilters.id || epsSearchFilters.name;
        if (!checkparams) {
            throw new InternalServerErrorException('No search parameters provided');
        }

        const queryBuilder = this.epsRepository.createQueryBuilder('eps');
        let hasFilter = false;

        if (epsSearchFilters.name) {
            queryBuilder.andWhere('eps.name ILIKE :name', { name: `%${epsSearchFilters.name}%` });
            hasFilter = true;
        }

        if (epsSearchFilters.id) {
            queryBuilder.andWhere('eps.id_eps = :id_eps', { id_eps: epsSearchFilters.id });
            hasFilter = true;
        }

        if (!hasFilter) {
            return [];
        }
        return queryBuilder.getMany();
    }

    public async updateEps(epsData: Eps): Promise<Eps> {
        try {
            if (!epsData) {
                throw new InternalServerErrorException('No eps data provided');
            }
            const existentEps = await this.epsRepository.findOne({ where: { id_eps: epsData.id_eps } });
            if (!existentEps) {
                throw new NotFoundException(`Eps with id ${epsData.id_eps} does not exist`);
            }
            existentEps.name = epsData.name;
            await this.epsRepository.save(existentEps);
            return existentEps;

        } catch (error) {
            console.error('Error updating eps:', error);
            throw new InternalServerErrorException('There was an error updating the eps');
        }
    }

    public async deleteEps(epsData: Eps): Promise<Eps> {
        try {
            const toDeleteEps = await this.epsRepository.findOne({ where: { id_eps: epsData.id_eps } });
            if (!toDeleteEps) {
                throw new NotFoundException(`Eps with id ${epsData.id_eps} does not exist`);
            }
            const hasChildren = await this.checkAssociatedChildren(toDeleteEps);

            if (hasChildren) {
                throw new InternalServerErrorException(`Eps with id ${epsData.id_eps} has associated children`);
            } else {
                await this.epsRepository.remove(toDeleteEps);
                return toDeleteEps;
            }

        } catch (error) {
            console.error('Error deleting eps:', error);
            throw new InternalServerErrorException('There was an error deleting the eps');
        }
    }

    public async checkAssociatedChildren(epsData: Eps): Promise<boolean> {
        try {
            const epsWithChildren = await this.epsRepository.findOne({
                where: { id_eps: epsData.id_eps },
                relations: ['children']
            });
            if (!epsWithChildren) {
                throw new NotFoundException(`Eps with id ${epsData.id_eps} does not exist`);
            }

            return epsWithChildren?.children.length > 0;

        } catch (error) {
            console.error('Error checking eps children:', error);
            throw new InternalServerErrorException('Error checking eps children');
        }
    }
}
