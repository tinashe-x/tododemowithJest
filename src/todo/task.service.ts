import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    private tasks: Task[] = [];
    private idCounter = 1;
    

    findAllTasks(): Task[] {
        return this.tasks;
    }

    findTaskById(id: number): Task{
        return this.tasks.find(t => t.id == id);
    }

    createTask(title: string, description: string): Task {
        const newTask: Task = {
            id: this.idCounter++,
            title,
            description,
            is_complete: false,
        };
        this.tasks.push(newTask)
        return newTask;
    }

    updateTask(id: number, title: string, description: string, is_complete: boolean): Task {
        const task = this.findTaskById(id);
        if (task) {
          task.title = title;
          task.description = description;
          task.is_complete = is_complete;
        }
        return task;
      }

      deleteTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);

      }
}

