import { useNotifications } from '../contexts/NotificationContext';
import { NotificationType } from '../types/notification';

export const useNotify = () => {
  const { addNotification } = useNotifications();

  const notify = {
    success: (message: string, duration?: number) => {
      addNotification({ type: 'success', message, duration });
    },
    error: (message: string, duration?: number) => {
      addNotification({ type: 'error', message, duration });
    },
    warning: (message: string, duration?: number) => {
      addNotification({ type: 'warning', message, duration });
    },
    info: (message: string, duration?: number) => {
      addNotification({ type: 'info', message, duration });
    },
    custom: (type: NotificationType, message: string, duration?: number) => {
      addNotification({ type, message, duration });
    },
  };

  return notify;
};