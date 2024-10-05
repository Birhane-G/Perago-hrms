import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from '../dto/createdepatment.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}
  async getRootDepartments(): Promise<Department[]> {
    return this.departmentRepository.find({
      where: { parentDepartment: null },
      relations: ['childDepartments'],
    });
  }
  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
    user: User,
  ): Promise<any> {
    let parentDepartment = null;
    if (createDepartmentDto.parentId) {
      parentDepartment = await this.departmentRepository.findOne({
        where: { department_id: createDepartmentDto.parentId },
      });
      if (!parentDepartment)
        throw new NotFoundException('Parent department not found');
    }
    const department = this.departmentRepository.create({
      ...createDepartmentDto,
      createdBy: user,
      parentDepartment: parentDepartment,
    });
    return await this.departmentRepository.save(department);
  }

  async getChildDepartments(parentDepartmentId: number): Promise<Department[]> {
    return this.departmentRepository.find({
      where: { parentDepartment: { department_id: parentDepartmentId } },
    });
  }
  async buildHierarchy(): Promise<Department[]> {
    const departments = await this.departmentRepository.find({
      relations: ['childDepartments', 'parentDepartment'],
    });
    const departmentMap = new Map<number, Department>();
    departments.forEach((department) => {
      departmentMap.set(department.department_id, {
        ...department,
        childDepartments: [],
      });
    });
    const Tree: Department[] = [];
    departmentMap.forEach((department) => {
      if (department.parentDepartment) {
        const parent = departmentMap.get(
          department.parentDepartment.department_id,
        );
        if (parent) {
          parent.childDepartments.push(department);
        }
      } else {
        Tree.push(department);
      }
    });
    return Tree;
  }
}
