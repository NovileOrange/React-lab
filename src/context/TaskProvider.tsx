import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  FILTER_STORAGE_KEY,
  TOAST_DURATION_MS,
  UNDO_DELAY_MS,
} from '../constants';
import { initialTasks } from '../data/initialTasks';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { taskReducer } from '../reducers/taskReducer';
import type { TaskState } from '../reducers/taskReducer';
import type { NewTask, TaskFilter, ToastMessage, ToastVariant } from '../types/task';
import { loadTasks, saveTasks } from '../utils/storage';
import { isTaskFilter } from '../utils/taskSelectors';
import { TaskContext } from './TaskContext';
import type { TaskContextValue } from './TaskContext';

function createInitialState(): TaskState {
  return { tasks: loadTasks() ?? initialTasks, pendingDelete: null, deleteSeq: 0 };
}

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, undefined, createInitialState);
  const [filter, setFilter] = useLocalStorage<TaskFilter>(
    FILTER_STORAGE_KEY,
    'all',
    isTaskFilter,
  );
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const toastCounter = useRef(0);

  const { tasks, pendingDelete } = state;
  const pendingSeq = pendingDelete?.seq;
  const pendingCount = pendingDelete?.ids.length ?? 0;

  const showToast = useCallback((message: string, variant: ToastVariant) => {
    toastCounter.current += 1;
    setToast({ id: toastCounter.current, message, variant });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!saveTasks(tasks)) {
      showToast('Не вдалося зберегти дані у браузері.', 'error');
    }
  }, [tasks, showToast]);

  useEffect(() => {
    if (!toast) return;
    const timerId = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => clearTimeout(timerId);
  }, [toast]);

  useEffect(() => {
    if (pendingSeq === undefined) return;
    const timerId = setTimeout(() => {
      dispatch({ type: 'confirmDelete' });
      showToast(
        pendingCount === 1
          ? 'Завдання остаточно видалено.'
          : `Остаточно видалено завдань: ${pendingCount}.`,
        'success',
      );
    }, UNDO_DELAY_MS);
    return () => clearTimeout(timerId);
  }, [pendingSeq, pendingCount, showToast]);

  const addTask = useCallback(
    (task: NewTask) => {
      if (!task.title.trim()) {
        showToast('Не вдалося додати завдання: назва порожня.', 'error');
        return false;
      }
      dispatch({ type: 'add', payload: task });
      showToast('Завдання створено.', 'success');
      return true;
    },
    [showToast],
  );

  const updateTask = useCallback(
    (id: number, changes: NewTask) => {
      if (!changes.title.trim()) {
        showToast('Не вдалося зберегти зміни: назва порожня.', 'error');
        return false;
      }
      if (pendingDelete?.ids.includes(id)) {
        showToast('Не вдалося зберегти зміни: завдання очікує на видалення.', 'error');
        return false;
      }
      dispatch({ type: 'update', payload: { id, changes } });
      showToast('Завдання оновлено.', 'success');
      return true;
    },
    [pendingDelete, showToast],
  );

  const toggleTask = useCallback((id: number) => {
    dispatch({ type: 'toggle', payload: { id } });
  }, []);

  const requestDelete = useCallback((id: number) => {
    dispatch({ type: 'requestDelete', payload: { id } });
  }, []);

  const undoDelete = useCallback(() => {
    dispatch({ type: 'undoDelete' });
    showToast('Видалення скасовано.', 'info');
  }, [showToast]);

  const clearCompleted = useCallback(() => {
    if (!tasks.some((task) => task.completed)) {
      showToast('Немає виконаних завдань для очищення.', 'error');
      return;
    }
    dispatch({ type: 'clearCompleted' });
  }, [tasks, showToast]);

  const resetTasks = useCallback(() => {
    dispatch({ type: 'reset' });
    showToast('Дані скинуто до початкових.', 'info');
  }, [showToast]);

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      filter,
      setFilter,
      pendingDelete,
      addTask,
      updateTask,
      toggleTask,
      requestDelete,
      undoDelete,
      clearCompleted,
      resetTasks,
      toast,
      dismissToast,
    }),
    [
      tasks,
      filter,
      setFilter,
      pendingDelete,
      addTask,
      updateTask,
      toggleTask,
      requestDelete,
      undoDelete,
      clearCompleted,
      resetTasks,
      toast,
      dismissToast,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
