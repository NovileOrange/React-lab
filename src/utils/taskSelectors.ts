import type { Task, TaskFilter } from '../types/task';

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === 'completed') return tasks.filter((task) => task.completed);
  if (filter === 'active') return tasks.filter((task) => !task.completed);
  return tasks;
}

export function countTasks(tasks: Task[]): Record<TaskFilter, number> {
  const completed = tasks.filter((task) => task.completed).length;
  return { all: tasks.length, completed, active: tasks.length - completed };
}
