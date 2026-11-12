import { initialTasks } from '../data/initialTasks';
import type { NewTask, Task } from '../types/task';

export interface PendingDelete {
  ids: number[];
  seq: number;
}

export interface TaskState {
  tasks: Task[];
  pendingDelete: PendingDelete | null;
  deleteSeq: number;
}

export type TaskAction =
  | { type: 'add'; payload: NewTask }
  | { type: 'toggle'; payload: { id: number } }
  | { type: 'update'; payload: { id: number; changes: NewTask } }
  | { type: 'requestDelete'; payload: { id: number } }
  | { type: 'confirmDelete' }
  | { type: 'undoDelete' }
  | { type: 'clearCompleted' }
  | { type: 'reset' };

function isPending(state: TaskState, id: number): boolean {
  return state.pendingDelete?.ids.includes(id) ?? false;
}

function finalizePending(state: TaskState): TaskState {
  if (!state.pendingDelete) return state;
  const ids = state.pendingDelete.ids;
  return {
    ...state,
    tasks: state.tasks.filter((task) => !ids.includes(task.id)),
    pendingDelete: null,
  };
}

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'add': {
      const nextId = state.tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: nextId, completed: false }],
      };
    }

    case 'toggle': {
      const { id } = action.payload;
      if (isPending(state, id)) return state;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      };
    }

    case 'update': {
      const { id, changes } = action.payload;
      if (isPending(state, id)) return state;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...changes } : task,
        ),
      };
    }

    case 'requestDelete': {
      const base = finalizePending(state);
      if (!base.tasks.some((task) => task.id === action.payload.id)) return state;
      const seq = base.deleteSeq + 1;
      return {
        ...base,
        deleteSeq: seq,
        pendingDelete: { ids: [action.payload.id], seq },
      };
    }

    case 'clearCompleted': {
      const base = finalizePending(state);
      const ids = base.tasks.filter((task) => task.completed).map((task) => task.id);
      if (ids.length === 0) return state;
      const seq = base.deleteSeq + 1;
      return { ...base, deleteSeq: seq, pendingDelete: { ids, seq } };
    }

    case 'confirmDelete':
      return finalizePending(state);

    case 'undoDelete':
      return state.pendingDelete ? { ...state, pendingDelete: null } : state;

    case 'reset':
      return { tasks: initialTasks, pendingDelete: null, deleteSeq: state.deleteSeq };

    default:
      return state;
  }
}
