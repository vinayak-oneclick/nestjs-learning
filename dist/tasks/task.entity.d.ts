import { User } from 'src/auth/user.entity';
import { BaseEntity } from 'typeorm';
import { TaskStatus } from './task-status.enum';
export declare class Task extends BaseEntity {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    user: User;
}
