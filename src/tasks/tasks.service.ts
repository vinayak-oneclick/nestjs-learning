import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getTaskById(id: string): Task {
        const found =  this.tasks.find(task => task.id === id);
        if(!found) {
            throw new NotFoundException("task not found");
        }
        return found;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(CreateTaskDto: CreateTaskDto): Task {
        const { title, description } = CreateTaskDto;

        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
        console.log('filter', filterDto);
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }
        console.log(search);
        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search) || task.description.includes(search)
            );
        }
        return tasks; 
    }
}
