import React from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import NotificationItem from './NotificationItem';

const NotificationContainer: React.FC = () => {
  const { notifications } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div className="flex flex-col-reverse gap-3">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className="w-80 pointer-events-auto"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <NotificationItem
              notification={notification}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer;