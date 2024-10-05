import { Injectable } from '@nestjs/common';
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
  ): Promise<Department> {
    const { name, parentId } = createDepartmentDto;

    const department = new Department();
    department.name = name;
    department.createdBy = user;

    if (parentId) {
      const parentDepartment = await this.departmentRepository.findOne({
        where: { department_id: parentId },
      });
      if (parentDepartment) {
        department.parentDepartment = parentDepartment;
      } else {
        throw new Error('Parent department not found');
      }
    }
    return await this.departmentRepository.save(department);
  }

  async getChildDepartments(parentDepartmentId: number): Promise<Department[]> {
    return this.departmentRepository.find({
      where: { parentDepartment: { department_id: parentDepartmentId } },
    });
  }
  async buildHierarchy(): Promise<Department[]> {
    const departments = await this.departmentRepository.find({
      relations: ['childDepartments'],
    });
    // Create a map to hold the hierarchy
    const departmentMap = new Map<number, Department>();
    departments.forEach((department) => {
      departmentMap.set(department.department_id, {
        ...department,
        childDepartments: [],
      });
    });

    // Build the hierarchy
    const hierarchy: Department[] = [];
    departmentMap.forEach((department) => {
      if (department.parentDepartment) {
        const parent = departmentMap.get(
          department.parentDepartment.department_id,
        );
        if (parent) {
          parent.childDepartments.push(department);
        }
      } else {
        hierarchy.push(department);
      }
    });

    return hierarchy;
  }
}
