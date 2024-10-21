import { Module } from '@nestjs/common';
import { ChildrenController } from './children-controller';
import { ChildrenService } from './children.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from 'src/Entity/Child';
import { Professional } from 'src/Entity/Professional';
import { Family_member } from 'src/Entity/Family_member';
import { Family } from 'src/Entity/Family';
import { Eps } from 'src/Entity/Eps';
import { EpsModule } from 'src/eps/eps.module';
import { EpsService } from 'src/Eps/eps.service';
import { FamilyService } from 'src/Family/family.service';
@Module({
  controllers: [ChildrenController],
  providers: [ChildrenService, EpsService, FamilyService],
  imports: [TypeOrmModule.forFeature([Child, Professional, Family_member, Family, Eps])],
  exports: [TypeOrmModule, ChildrenService]
})
export class ChildrenModule { }
