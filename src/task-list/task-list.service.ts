import { Injectable } from '@nestjs/common';
import { CreateTaskListDto } from './dto/task-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskList } from './entities/task-list.entity';
import { CustomHttpExceptionValidate } from 'src/common/httpExeptions/CustomHttpException';
import { validateUUID } from 'src/common/validations/validateUUID';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
  ) {}

  async findOneById(id: string): Promise<TaskList> {
    const task = await this.taskListRepository.findOne({
      where: { id },
    });
    return task;
  }

  private async validateId(id: string, method: string, patch: string) {
    if (!id.trim()) {
      throw new CustomHttpExceptionValidate(
        method,
        patch,
        'The id field is required and has not been provided.',
        'id',
        400,
      );
    }
    const is_uuid = validateUUID(id);

    if (!is_uuid) {
      throw new CustomHttpExceptionValidate(
        method,
        patch,
        'The id must be a valid UUID format.',
        'id',
        400,
      );
    }
  }

  async create(createTaskListDto: CreateTaskListDto): Promise<TaskList> {
    try {
      const newTask = this.taskListRepository.create(createTaskListDto);
      return this.taskListRepository.save(newTask);
    } catch (error) {
      throw new CustomHttpExceptionValidate(
        'POST',
        '/create',
        'This create error ',
        'Create task',
        403,
      );
    }
  }

  async findOne(id: string) {
    this.validateId(id, 'GET', '/details/:id');
    const task = await this.findOneById(id);
    if (!task) {
      throw new CustomHttpExceptionValidate(
        'GET',
        '/details/:id',
        'The details was not found',
        'id',
        400,
      );
    } else {
      return task;
    }
  }

  async update(id: string, updateTaskListDto: any): Promise<TaskList> {
    this.validateId(id, 'PUT', '/update/:id');
    const dataUpdate = {
      ...updateTaskListDto,
      updated_at: new Date(),
    };
    return await this.taskListRepository.save(dataUpdate);
  }

  async delete(id: string): Promise<string> {
    this.validateId(id, 'DELETE', '/delete/:id');
    const validateTask = await this.findOneById(id);
    if (!validateTask) {
      throw new CustomHttpExceptionValidate(
        'DELETE',
        '/delete/:id',
        'Task not exist, change for other task',
        'id',
      );
    }
    const dataDelete = {
      ...validateTask,
      deleted_at: new Date(),
      active: false,
    };
    await this.taskListRepository.save(dataDelete);
    return 'Deleted Successfully';
  }
}
