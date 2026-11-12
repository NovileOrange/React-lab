import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { PendingDelete } from '../reducers/taskReducer';
import type { NewTask, Task, TaskFilter, ToastMessage } from '../types/task';

export interface TaskContextValue {
  tasks: Task[];
  filter: TaskFilter;
  setFilter: Dispatch<SetStateAction<TaskFilter>>;
  pendingDelete: PendingDelete | null;
  addTask: (task: NewTask) => boolean;
  updateTask: (id: number, changes: NewTask) => boolean;
  toggleTask: (id: number) => void;
  requestDelete: (id: number) => void;
  undoDelete: () => void;
  clearCompleted: () => void;
  resetTasks: () => void;
  toast: ToastMessage | null;
  dismissToast: () => void;
}

export const TaskContext = createContext<TaskContextValue | null>(null);
