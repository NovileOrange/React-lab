import type { ToastVariant } from '../types/task';

interface ToastProps {
  message: string;
  variant: ToastVariant;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  progressMs?: number;
}

const bootstrapColors: Record<ToastVariant, string> = {
  success: 'success',
  error: 'danger',
  info: 'info',
  warning: 'warning',
};

function Toast({ message, variant, onClose, actionLabel, onAction, progressMs }: ToastProps) {
  const color = bootstrapColors[variant];
  const lightText = color === 'success' || color === 'danger';

  return (
    <div
      className={`toast show overflow-hidden border-0 shadow text-bg-${color}`}
      role="status"
      aria-live="polite"
    >
      <div className="d-flex align-items-center">
        <div className="toast-body d-flex align-items-center gap-3 flex-grow-1">
          <span className="flex-grow-1">{message}</span>
          {actionLabel && onAction && (
            <button type="button" className="btn btn-sm btn-dark" onClick={onAction}>
              {actionLabel}
            </button>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            className={lightText ? 'btn-close btn-close-white me-2' : 'btn-close me-2'}
            aria-label="Закрити повідомлення"
            onClick={onClose}
          />
        )}
      </div>
      {progressMs !== undefined && (
        <div className="progress rounded-0" style={{ height: 4 }}>
          <div
            className="progress-bar bg-dark toast-countdown w-100"
            style={{ animationDuration: `${progressMs}ms` }}
          />
        </div>
      )}
    </div>
  );
}

export default Toast;
