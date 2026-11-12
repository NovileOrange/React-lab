import { TASKS_STORAGE_KEY } from '../constants';
import type { Task } from '../types/task';

const priorities = ['low', 'medium', 'high'];

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false;
  const task = value as Record<string, unknown>;
  return (
    typeof task.id === 'number' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    typeof task.completed === 'boolean' &&
    typeof task.priority === 'string' &&
    priorities.includes(task.priority) &&
    typeof task.category === 'string'
  );
}

export function loadTasks(): Task[] | null {
  try {
    const raw = window.localStorage.getItem(TASKS_STORAGE_KEY);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isTask)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveTasks(tasks: Task[]): boolean {
  try {
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
