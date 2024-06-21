import { TaskService } from './task.service';
import { Task } from './task.model';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  it('should return an empty array of tasks initially', () => {
    expect(taskService.findAllTasks()).toEqual([]);
  });

  it('should create a new task', () => {
    const task = taskService.createTask('Task 1', 'This is task 1');
    expect(task).toEqual({
      id: 1,
      title: 'Task 1',
      description: 'This is task 1',
      is_complete: false,
    });
    expect(taskService.findAllTasks()).toEqual([task]);
  });

  it('should find a task by id', () => {
    const task1 = taskService.createTask('Task 1', 'This is task 1');
    const task2 = taskService.createTask('Task 2', 'This is task 2');
    expect(taskService.findTaskById(1)).toEqual(task1);
    expect(taskService.findTaskById(2)).toEqual(task2);
    expect(taskService.findTaskById(3)).toBeUndefined();
  });

  it('should update a task', () => {
    const task = taskService.createTask('Task 1', 'This is task 1');
    taskService.updateTask(1, 'Task 1 updated', 'This is task 1 updated', true);
    expect(taskService.findTaskById(1)).toEqual({
      id: 1,
      title: 'Task 1 updated',
      description: 'This is task 1 updated',
      is_complete: true,
    });
  });

  it('should delete a task', () => {
    const task1 = taskService.createTask('Task 1', 'This is task 1');
    const task2 = taskService.createTask('Task 2', 'This is task 2');
    taskService.deleteTask(1);
    expect(taskService.findAllTasks()).toEqual([task2]);
  });
});