import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { Department } from 'src/entities/department.entity';
import { CreateDepartmentDto } from '../dto/createdepatment.dto';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async getDepartments() {
    const rootDepartments = await this.departmentService.getRootDepartments();
    return rootDepartments;
  }

  @Post()
  async createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @Req() request: Request,
  ): Promise<Department> {
    const user = request.user as User;
    return this.departmentService.createDepartment(createDepartmentDto, user);
  }
  @Get('hierarchy')
  async getHierarchy(): Promise<Department[]> {
    return this.departmentService.buildHierarchy();
  }
}
