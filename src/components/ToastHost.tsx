import { UNDO_DELAY_MS } from '../constants';
import { useTaskContext } from '../hooks/useTaskContext';
import Toast from './Toast';

function ToastHost() {
  const { toast, pendingDelete, dismissToast, undoDelete } = useTaskContext();

  let content = null;

  if (pendingDelete) {
    const count = pendingDelete.ids.length;
    content = (
      <Toast
        key={`pending-${pendingDelete.seq}`}
        variant="warning"
        message={
          count === 1 ? 'Завдання буде видалено' : `Буде видалено завдань: ${count}`
        }
        actionLabel="Скасувати"
        onAction={undoDelete}
        progressMs={UNDO_DELAY_MS}
      />
    );
  } else if (toast) {
    content = (
      <Toast
        key={toast.id}
        variant={toast.variant}
        message={toast.message}
        onClose={dismissToast}
      />
    );
  }

  return <div className="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3">
      {content}
    </div>;
}

export default ToastHost;
