import { useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import TaskFilters from './components/TaskFilters';
import TaskActions from './components/TaskActions';
import TaskList from './components/TaskList';
import ToastHost from './components/ToastHost';
import { useTaskContext } from './hooks/useTaskContext';
import { countTasks } from './utils/taskSelectors';

function App() {
  const { tasks } = useTaskContext();
  const { active } = countTasks(tasks);

  useEffect(() => {
    document.title = `Study Planner — ${active} active tasks`;
  }, [active]);

  return (
    <div className="container py-4">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <Header />
        <section className="mt-4">
          <TaskForm />
        </section>
        <section className="mt-4">
          <TaskStats />
        </section>
        <section className="mt-4 d-flex flex-wrap justify-content-between align-items-center gap-2">
          <TaskFilters />
          <TaskActions />
        </section>
        <section className="mt-3">
          <TaskList />
        </section>
      </div>
      <ToastHost />
    </div>
  );
}

export default App;
