import { Body, Controller, Get, Param, Post, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.taskService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.taskService.deleteTask(id, user);
    }

    @Patch('/:id')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id :number,
        @GetUser() user: User,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task>  {
        return this.taskService.updateTaskStatus(id, status, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() CreateTaskDto: CreateTaskDto,
        @GetUser() user: User,
        ): Promise<Task> {
        return this.taskService.createTask(CreateTaskDto, user);
    } 
}
