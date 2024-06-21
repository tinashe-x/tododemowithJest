import { TaskService } from "../task.service";


describe.only('TaskService', () => {
  let taskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  it.only('should return an empty array of tasks initially', () => {
    (require('assert')).deepEqual(taskService.findAllTasks(), []);
  });

  it.only('should create a new task', () => {
    const task = taskService.createTask('Task 1', 'This is task 1');
    (require('assert')).deepEqual(task, {
      id: 1,
      title: 'Task 1',
      description: 'This is task 1',
      is_complete: false,
    });
    (require('assert')).deepEqual(taskService.findAllTasks(), [task]);
  });

  it.only('should find a task by id', () => {
    const task1 = taskService.createTask('Task 1', 'This is task 1');
    const task2 = taskService.createTask('Task 2', 'This is task 2');
    (require('assert')).deepEqual(taskService.findTaskById(1), task1);
    (require('assert')).deepEqual(taskService.findTaskById(2), task2);
    (require('assert')).strictEqual(taskService.findTaskById(3), undefined);
  });

  it.only('should update a task', () => {
    const task = taskService.createTask('Task 1', 'This is task 1');
    taskService.updateTask(1, 'Task 1 updated', 'This is task 1 updated', true);
    (require('assert')).deepEqual(taskService.findTaskById(1), {
      id: 1,
      title: 'Task 1 updated',
      description: 'This is task 1 updated',
      is_complete: true,
    });
  });

  it.only('should delete a task', () => {
    const task1 = taskService.createTask('Task 1', 'This is task 1');
    const task2 = taskService.createTask('Task 2', 'This is task 2');
    taskService.deleteTask(1);
    (require('assert')).deepEqual(taskService.findAllTasks(), [task2]);
  });
});