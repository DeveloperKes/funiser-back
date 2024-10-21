import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eps } from '../Entity/Eps';
import { EpsService } from './eps.service';
import { EpsController } from './eps.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Eps])], // Importa el repositorio de Eps
    providers: [EpsService],
    controllers: [EpsController],
    exports: [EpsService], // Exporta el servicio si necesitas usarlo en otros módulos
})
export class EpsModule {}
