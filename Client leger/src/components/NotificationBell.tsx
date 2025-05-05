import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Notification } from '@prisma/client';

interface NotificationBellProps {
  userId: number;
}

export default function NotificationBell({ userId }: NotificationBellProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Récupérer les notifications
  const fetchNotifications = async () => {
    const response = await fetch(`/api/notifications?userId=${userId}`);
    if (response.ok) {
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.isRead).length);
    }
  };

  // Marquer une notification comme lue
  const markAsRead = async (notificationId: number) => {
    const response = await fetch(`/api/notifications/${notificationId}/read`, {
      method: 'POST',
    });
    if (response.ok) {
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => prev - 1);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Rafraîchir les notifications toutes les 30 secondes
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            {notifications.length === 0 ? (
              <p className="text-gray-500">Aucune notification</p>
            ) : (
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li 
                    key={notification.id}
                    className={`p-3 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50'}`}
                    onClick={() => !notification.isRead && markAsRead(notification.id)}
                  >
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
