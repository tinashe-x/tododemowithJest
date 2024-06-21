import { Controller, Get, Param, NotFoundException, Post, Body, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TaskService){}

    @Get()
    getTasks(): Task[] {
        return this.taskService.findAllTasks();
    }
    
    @Get(':id')
    getTaskById(@Param('id') id: number): Task {
        let task = this.taskService.findTaskById(id);

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return this.taskService.findTaskById(id);
    }

    @Post()
    createTask(@Body() body: { title: string, description: string }): Task {
    return this.taskService.createTask(body.title, body.description);
    }

    @Put(':id')
   updateTask(
     @Param('id') id: number,
     @Body() body: { title: string, description: string, is_completed: boolean }
   ): Task {
    return this.taskService.updateTask(id, body.title, body.description, body.is_completed);
  }

    @Delete(':id')
     deleteTask(@Param('id') id: number): void {
        this.taskService.deleteTask(id);
  }

}
