import { Controller, Post, Get, Put, Delete, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ChildrenService } from '../children/children.service'; 
import { ChildData, ChildSearchFilters } from '../types/types';

@Controller('children') // Ruta base para este controlador
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {} 

  @Post()
  async createChild(@Body() childData: ChildData, @Res() res: Response) {
    if (!childData) {
      return res.status(HttpStatus.BAD_REQUEST).json({ ok: false, message: 'Child data not provided' });
    }
    if (!childData.eps_id) {
      return res.status(HttpStatus.BAD_REQUEST).json({ ok: false, message: 'EPS ID not provided' });
    }
    const newChild = await this.childrenService.createChild(childData);
    if (!newChild) {
      return res.status(HttpStatus.NOT_FOUND).json({ ok: false, message: 'Something went wrong while creating child' });
    }
    return res.status(HttpStatus.CREATED).json({ ok: true, child: newChild });
  }

  @Get()
  async getChildren(@Body() childFilter: ChildSearchFilters, @Res() res: Response) {
    const atLeastOneFilter = Object.values(childFilter).some(value => value !== undefined && value !== null);

    if (!atLeastOneFilter) {
      return res.status(HttpStatus.BAD_REQUEST).json({ ok: false, message: 'No search parameters provided' });
    }
    const fetching = await this.childrenService.filterChildren(childFilter);

    if (!fetching || fetching.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({ ok: false, message: 'No children found by the provided parameters' });
    }

    return res.json({ ok: true, childrencoincidences: fetching });
  }

  @Put()
  async updateChild(@Body() updateChildData: ChildData, @Res() res: Response) {
    if (!updateChildData) {
      return res.status(HttpStatus.BAD_REQUEST).json({ ok: false, message: 'Child data not provided' });
    }
    const updatedChild = await this.childrenService.updateChild(updateChildData);
    return res.json({ ok: true, child: updatedChild });
  }

  @Delete()
  async deleteChild(@Body() childToDel: ChildData, @Res() res: Response) {
    if (!childToDel) {
      return res.status(HttpStatus.BAD_REQUEST).json({ ok: false, message: 'Child data not provided' });
    }
    const deletedChild = await this.childrenService.deleteChild(childToDel);
    return res.json({ ok: true, message: `Child with data ${deletedChild} was deleted` });
  }
}
