import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { Department } from 'src/entities/department.entity';
import { CreateDepartmentDto } from '../dto/createdepatment.dto';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/config/guard/jwt.auth.guard';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async getDepartments() {
    const rootDepartments = await this.departmentService.getRootDepartments();
    return rootDepartments;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @Request() request,
  ): Promise<any> {
    const user = request.user as User;
    return this.departmentService.createDepartment(createDepartmentDto, user);
  }
  @Get('hierarchy')
  async getHierarchy(): Promise<Department[]> {
    return this.departmentService.buildHierarchy();
  }
}
