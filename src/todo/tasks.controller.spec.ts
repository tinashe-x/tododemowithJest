import { TasksController } from './tasks.controller';
import { TaskService } from './task.service';
import { NotFoundException } from '@nestjs/common';
import { Task } from './task.model';

describe('TasksController', () => {
  let tasksController: TasksController;
  let taskService: TaskService;


  beforeEach(() => {
    taskService = new TaskService();
    tasksController = new TasksController(taskService);
  });

  it('should create a new task', () => {
    const body = { title: 'New Task', description: 'This is a new task' };
    taskService.createTask = jest.fn().mockReturnValue(new Task()); // mock the createTask method
    const result = tasksController.createTask(body);
    expect(result).toBeInstanceOf(Task);
  });

  it('should return a task by id', () => {
    const task = taskService.createTask('Task 1', 'This is task 1');
    const result = tasksController.getTaskById(task.id);
    expect(result).toEqual(task);
  });
  
  it('should return all tasks', () => {
    const tasks = tasksController.getTasks();
    expect(tasks).toEqual(taskService.findAllTasks());
  });


  it('should throw NotFoundException when task not found', () => {
    expect(() => tasksController.getTaskById(999)).toThrowError(new NotFoundException(`Task with ID 999 not found`));
  });



  it('should update a task', () => {
    const task = new Task();
    const body = { title: 'Updated Task', description: 'This is an updated task', is_completed: true };
    taskService.updateTask = jest.fn().mockReturnValue(new Task()); // mock the updateTask method
    const result = tasksController.updateTask(task.id, body);
    expect(result).toBeInstanceOf(Task);
  });

  it('should delete a task', () => {
    const task = taskService.createTask('Task 1', 'This is task 1');
    tasksController.deleteTask(task.id);
    expect(taskService.findAllTasks()).not.toContain(task);
  });
});