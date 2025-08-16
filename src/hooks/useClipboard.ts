import { useCallback } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

export const useClipboard = () => {
  const { addNotification } = useNotifications();

  const copyToClipboard = useCallback(async (text: string, successMessage?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addNotification({
        type: 'success',
        message: successMessage || 'Copied to clipboard!',
        duration: 3000,
      });
    } catch (error) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        
        addNotification({
          type: 'success',
          message: successMessage || 'Copied to clipboard!',
          duration: 3000,
        });
      } catch (fallbackError) {
        addNotification({
          type: 'error',
          message: 'Failed to copy to clipboard',
          duration: 4000,
        });
      }
    }
  }, [addNotification]);

  return { copyToClipboard };
};