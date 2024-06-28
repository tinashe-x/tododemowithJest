import { NotFoundException } from "@nestjs/common";
import { TasksController } from "../tasks.controller";
import { TaskService } from "../task.service";
import { Task } from "../task.model";

describe.only('TasksController', () => {
  let tasksController;
  let taskService;

  beforeEach(() => {
    taskService = new TaskService();
    tasksController = new TasksController(taskService);
  });

  it.only('should create a new task', () => {
    const body = { title: 'New Task', description: 'This is a new task' };
    taskService.createTask = function() { return new Task(); }; // mock the createTask method
    const result = tasksController.createTask(body);
    (require('assert')).ok(result instanceof Task);
  });

  it.only('should return a task by id', () => {
    const task = taskService.createTask('Task 1', 'This is task 1');
    const result = tasksController.getTaskById(task.id);
    (require('assert')).strictEqual(result, task);
  });

  it.only('should return all tasks', () => {
    const tasks = tasksController.getTasks();
    (require('assert')).deepEqual(tasks, taskService.findAllTasks());
  });

  it.only('should throw NotFoundException when task not found', () => {
    (require('assert')).throws(function() {
      tasksController.getTaskById(999);
    }, new NotFoundException(`Task with ID 999 not found`));
  });

  it.only('should update a task', () => {
    const task = new Task();
    const body = { title: 'Updated Task', description: 'This is an updated task', is_completed: true };
    taskService.updateTask = function() { return new Task(); }; // mock the updateTask method
    const result = tasksController.updateTask(task.id, body);
    (require('assert')).ok(result instanceof Task);
  });

  it.only('should delete a task', async () => {
    const task = taskService.createTask('Task 1', 'This is task 1');
    taskService.deleteTask = async (id) => { // mock the deleteTask method
      taskService.tasks = taskService.tasks.filter((t) => t.id!== id);
    };
    const result = await tasksController.delete(task.id);
    (require('assert')).ok(result === `Task with id ${task.id} deleted successfully`);
    (require('assert')).ok(!taskService.tasks.includes(task));
  });
});