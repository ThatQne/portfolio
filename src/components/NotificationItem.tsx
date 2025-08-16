import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Notification, NotificationType } from '../types/notification';
import { useNotifications } from '../contexts/NotificationContext';

interface NotificationItemProps {
  notification: Notification;
  index: number;
}

const getNotificationConfig = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return {
        icon: CheckCircle,
        iconColor: '#10b981', // emerald-500
        progressColor: '#10b981',
      };
    case 'error':
      return {
        icon: AlertCircle,
        iconColor: '#ef4444', // red-500
        progressColor: '#ef4444',
      };
    case 'warning':
      return {
        icon: AlertTriangle,
        iconColor: '#f59e0b', // amber-500
        progressColor: '#f59e0b',
      };
    case 'info':
      return {
        icon: Info,
        iconColor: '#3b82f6', // blue-500
        progressColor: '#3b82f6',
      };
  }
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, index }) => {
  const { removeNotification } = useNotifications();
  const [progress, setProgress] = useState(100);
  const config = getNotificationConfig(notification.type);
  const IconComponent = config.icon;

  useEffect(() => {
    const duration = notification.duration || 4000;
    const interval = 50; // Update every 50ms
    const decrement = (100 * interval) / duration;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - decrement;
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [notification.duration]);

  const handleClick = () => {
    removeNotification(notification.id);
  };

  return (
    <div
      className="
        relative overflow-hidden cursor-pointer transform transition-all duration-300 ease-out
        bg-theme-card border border-theme-primary rounded-xl shadow-lg backdrop-blur-sm
        hover:bg-theme-card-hover hover:border-theme-accent hover:shadow-xl hover:scale-[1.02]
        animate-in slide-in-from-right-full theme-card
      "
      onClick={handleClick}
    >
      <div className="flex items-center p-4">
        <div 
          className="p-2 rounded-lg mr-3 flex-shrink-0"
          style={{ backgroundColor: `${config.iconColor}20` }}
        >
          <IconComponent 
            size={18} 
            style={{ color: config.iconColor }}
          />
        </div>
        <p className="text-sm font-medium text-theme-primary flex-1 leading-relaxed">
          {notification.message}
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-theme-secondary bg-opacity-20 w-full">
        <div
          className="h-full transition-all duration-75 ease-linear rounded-full"
          style={{ 
            width: `${progress}%`,
            backgroundColor: config.progressColor
          }}
        />
      </div>
    </div>
  );
};

export default NotificationItem;