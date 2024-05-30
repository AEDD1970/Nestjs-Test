import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto, UuidDto } from './dto/task-list.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('TaskList')
@Controller('taskList')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post('/create')
  @ApiBody({
    type: CreateTaskListDto,
    description: 'Insert Task data',
  })
  @ApiOperation({ summary: 'Register of task' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiResponse({ status: 201, description: 'Task create' })
  create(@Body() createTaskListDto: CreateTaskListDto) {
    return this.taskListService.create(createTaskListDto);
  }

  @Get('/details/:id')
  @ApiParam({ name: 'id', type: UuidDto })
  @ApiBody({ type: String, description: 'Detail one task' })
  @ApiOperation({ summary: 'Get task for ID' })
  @ApiResponse({ status: 200, description: 'Task encountered' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  findOne(@Param('id') id: string) {
    return this.taskListService.findOne(id);
  }
  @Put('/update/:id')
  @ApiBody({
    type: CreateTaskListDto,
    description: 'Modify task data',
  })
  @ApiParam({ name: 'id', type: UuidDto })
  @ApiOperation({ summary: 'Edit one task' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiResponse({ status: 200, description: 'The task was modified' })
  update(@Param('id') id: string, @Body() updateTaskListDto: any) {
    return this.taskListService.update(id, updateTaskListDto);
  }

  @Delete('/delete/:id')
  @ApiParam({ name: 'id', type: UuidDto })
  @ApiOperation({ summary: 'Delete de task' })
  @ApiBody({ type: String, description: 'Delete one task' })
  @ApiResponse({ status: 200, description: 'Task was eliminated logic' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  remove(@Param('id') id: string) {
    console.log(id);
    return this.taskListService.delete(id);
  }
}
