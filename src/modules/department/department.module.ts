import { Module } from '@nestjs/common';
import { DepartmentController } from './controllers/department.controller';
import { DepartmentService } from './services/department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
